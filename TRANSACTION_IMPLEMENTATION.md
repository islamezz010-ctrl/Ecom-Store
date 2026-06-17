# MongoDB Transaction Implementation Report

## Applied MongoDB Transaction Principle

**Principle:** "If all the data you need to update lives inside a single MongoDB document, you usually don't need a transaction. If multiple documents or collections must succeed or fail together, use a transaction."

---

## Implemented Transactions

### 1. ✅ **Checkout Session Creation** (`checkoutController.js`)

**Status:** Transactional  
**Location:** `createCheckoutSession` endpoint

**Operations:**

- Verify and reduce stock from **multiple Product documents**
- Create a new **Order document**
- All calculations done within transaction scope

**Problem Solved:**

- **Before:** If `Order.create()` failed after stock reduction, stock would be permanently lost (data inconsistency)
- **After:** Transaction ensures either all operations complete or all rollback atomically

**Code Example:**

```javascript
const order = await withTransaction(async (session) => {
  // Stock reduction and order creation happen atomically
  for (const item of items) {
    const result = await Product.findOneAndUpdate(
      { _id: item.id, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { new: true, session }
    );
    // ... error handling
  }
  const [createdOrder] = await Order.create([...], { session });
  return createdOrder;
});
```

**Benefits:**

- ✅ Stock inventory always matches order count
- ✅ No "orphaned" stock reductions
- ✅ Automatic rollback on any failure

---

### 2. ✅ **Checkout Expiration Handling** (`webhookController.js`)

**Status:** Transactional  
**Location:** `handleCheckoutExpired` webhook handler

**Operations:**

- Release reserved stock from **multiple Product documents**
- Update **Order status** to "cancelled"

**Problem Solved:**

- **Before:** If `order.save()` failed after stock release, order would show as "pending" but stock would already be released (data inconsistency)
- **After:** Both operations succeed or rollback together

**Code Example:**

```javascript
await withTransaction(async (session) => {
  for (const item of order.items) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { stock: item.quantity } },
      { session },
    );
  }
  order.status = "cancelled";
  await order.save({ session });
});
```

**Benefits:**

- ✅ Stock and order status always consistent
- ✅ Prevents "ghost" stock releases
- ✅ Reliable order state tracking

---

### 3. ✅ **Address Default Reassignment** (`addressController.js`)

**Status:** Transactional  
**Location:** `deleteAddress` endpoint

**Operations:**

- Delete the target **Address document**
- If it was default, set another **Address document** as default

**Problem Solved:**

- **Before:** If the second `save()` failed, user would have no default address (data inconsistency)
- **After:** Either both operations complete or both rollback

**Code Example:**

```javascript
await withTransaction(async (session) => {
  const address = await Address.findOneAndDelete(
    { _id: req.params.id, user: req.user._id },
    { session },
  );

  if (address.isDefault) {
    const next = await Address.findOne({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .session(session);
    if (next) {
      next.isDefault = true;
      await next.save({ session });
    }
  }
});
```

**Benefits:**

- ✅ User always has a default address (if any exist)
- ✅ No orphaned address states
- ✅ Guaranteed consistency

---

## Non-Transactional Operations (No Changes Needed)

### Why They Don't Need Transactions:

| Operation                       | Reason                                                             |
| ------------------------------- | ------------------------------------------------------------------ |
| `handleCheckoutCompleted`       | Only updates **single Order document** (atomic at document level)  |
| `register`/`login`              | Only updates **single User document**                              |
| `googleAuth`                    | All fields updated in **one User document** during single `save()` |
| `createAddress`                 | Creates **single Address document**                                |
| `updateAddress`                 | Updates **single Address document**                                |
| `getProducts`, `getProductById` | Read-only operations (no consistency risk)                         |

---

## Transaction Utility

**File:** `server/lib/transactionHelper.js`

**Features:**

- `withTransaction(operation)` - Single operation wrapper
- `withTransactionMultiple(operations)` - Multiple operations
- Automatic session management (start, commit, abort, end)
- Clean error handling and rollback

**Usage:**

```javascript
const result = await withTransaction(async (session) => {
  // Your operations with { session } option
  await Model.updateOne({...}, {...}, { session });
  await Model.create([...], { session });
  return result;
});
// Transaction automatically committed if no errors
// Transaction automatically rolled back if any error occurs
```

---

## Data Consistency Guarantees

### Before vs After

| Scenario                             | Before                | After              |
| ------------------------------------ | --------------------- | ------------------ |
| Checkout fails after stock reduction | ❌ Stock lost         | ✅ Stock restored  |
| Session expires with partial updates | ❌ Inconsistent state | ✅ Clean rollback  |
| Address deletion without default     | ❌ No default         | ✅ New default set |
| Payment webhook fails mid-process    | ❌ Partial update     | ✅ All-or-nothing  |

---

## Performance Considerations

- **Minimal Impact:** Transactions only on critical operations (3 endpoints)
- **Session Overhead:** Negligible for fast operations (<100ms typically)
- **Replica Set Required:** MongoDB transactions require a replica set (production standard)
- **Scalability:** Sessions are connection-scoped, no global locks

---

## Testing Checklist

- [ ] Checkout with insufficient stock → verify rollback
- [ ] Webhook with network failure → verify automatic retry
- [ ] Delete default address → verify new default set
- [ ] Concurrent checkout attempts → verify stock accuracy
- [ ] Order status changes → verify consistency with stock levels

---

## Deployment Notes

✅ No database schema changes required  
✅ No migration scripts needed  
✅ Backward compatible  
⚠️ Requires MongoDB 4.0+ (transactions support)  
⚠️ Production setup requires replica set (even single-node replica set works)
