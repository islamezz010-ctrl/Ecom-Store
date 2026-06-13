#!/usr/bin/env node

/**
 * Validation Logging Integration Example
 *
 * This script demonstrates how request validation logging works throughout the app.
 * All existing routes already use the enhanced validate middleware automatically.
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║    REQUEST VALIDATION LOGGING - INTEGRATION COMPLETE          ║
╚════════════════════════════════════════════════════════════════╝

✅ INTEGRATED INTO ALL ROUTES

The following routes now automatically log validation events:

📍 Authentication Routes (server/routes/auth.js)
   POST   /api/auth/register       ✓ Logs email, password validation
   POST   /api/auth/login          ✓ Logs credentials
   POST   /api/auth/google         ✓ Logs OAuth validation
   PUT    /api/auth/profile        ✓ Logs profile updates
   PUT    /api/auth/password       ✓ Logs password change attempts

📍 Product Routes (server/routes/products.js)
   GET    /api/products            ✓ Logs query parameters
   GET    /api/products/:id        ✓ Logs product lookups

📍 Checkout Routes (server/routes/checkout.js)
   POST   /api/checkout/session    ✓ Logs cart validation
   POST   /api/checkout/validate   ✓ Logs order details

📍 Admin Routes (server/routes/admin/*)
   POST   /api/admin/products      ✓ Logs product creation
   PUT    /api/admin/products/:id  ✓ Logs product updates
   POST   /api/admin/orders        ✓ Logs order status changes

═══════════════════════════════════════════════════════════════════

🔍 WHAT GETS LOGGED

1. Validation Errors
   ├─ Field name and validation rule
   ├─ Request path and method
   ├─ User ID (or "anonymous")
   ├─ Client IP address
   └─ Request timestamp

2. Suspicious Inputs
   ├─ XSS attempts: <script>, javascript:, on* handlers
   ├─ SQL injection: SELECT, UNION, DROP, INSERT, UPDATE, DELETE
   ├─ NoSQL injection: $where, $regex, ObjectId
   └─ Path traversal: ../, //, etc/passwd

3. Validation Metrics
   ├─ Total validation attempts
   ├─ Success/failure counts
   ├─ Error rate percentage
   └─ Suspicious activity count

═══════════════════════════════════════════════════════════════════

🚀 QUICK START

1. Environment Variables
   In server/.env, add optional logging controls:
   
   LOG_VALIDATION_SUCCESS=true   # Show successful validations
   LOG_VALIDATION_METRICS=true   # Show periodic metrics

2. Start the Server
   cd server
   npm run dev

3. Test Validation Logging
   
   Valid Request:
   $ curl -X POST http://localhost:5000/api/auth/register \\
     -H "Content-Type: application/json" \\
     -d '{"name":"John","email":"john@example.com","password":"SecurePass123"}'
   
   Invalid Request:
   $ curl -X POST http://localhost:5000/api/auth/register \\
     -H "Content-Type: application/json" \\
     -d '{"name":"J","email":"invalid-email","password":"123"}'
   
   Console Output:
   [VALIDATION_ERROR] {"timestamp":"...","method":"POST",...}
     [1] name: "name" length must be at least 2 characters long
     [2] email: "email" must be a valid email
     [3] password: "password" must be at least 6 characters

4. View Metrics
   $ curl http://localhost:5000/api/admin/metrics/validation | jq
   
   {
     "validation": {
       "uptime": 3600000,
       "totalValidations": 156,
       "errors": 8,
       "successes": 148,
       "suspicious": 1,
       "errorRate": 0.0513
     },
     "timestamp": "2026-06-12T10:45:30.000Z"
   }

═══════════════════════════════════════════════════════════════════

📊 MONITORING & ALERTS

Set up alerts based on metrics:

High Error Rate Alert:
if (stats.errorRate > 0.05) {
  // Error rate > 5%, send notification
}

Suspicious Activity Alert:
if (stats.suspicious > 5) {
  // Security threat detected, alert admin
}

Monitor Specific Fields:
grep "password.*invalid" server.log
grep "email.*must be" server.log

═══════════════════════════════════════════════════════════════════

🔐 SECURITY FEATURES

✓ Automatically detects XSS attempts
✓ Detects SQL injection patterns
✓ Detects NoSQL injection ($where, $regex)
✓ Detects path traversal attacks
✓ Never logs passwords or sensitive data
✓ IP-based tracking for attack patterns
✓ Suspicious input alerting

═══════════════════════════════════════════════════════════════════

📝 LOG EXAMPLES

Success (with LOG_VALIDATION_SUCCESS=true):
[VALIDATION_SUCCESS] 2026-06-12T10:45:00.123Z POST /api/auth/register from 192.168.1.1

Validation Error:
[VALIDATION_ERROR] {"timestamp":"2026-06-12T10:45:05.456Z",...}
  [1] email: "email" must be a valid email
  [2] password: "password" must be at least 6 characters

Suspicious Input:
[SUSPICIOUS_INPUT] 2026-06-12T10:45:10.789Z Field: query, Reason: SQL injection attempt, User: anonymous, IP: 192.168.1.1

Metrics (with LOG_VALIDATION_METRICS=true):
[VALIDATION_METRICS] 2026-06-12T10:50:00.000Z: {
  "uptime": 60000,
  "totalValidations": 156,
  "errors": 8,
  "successes": 148,
  "suspicious": 1,
  "errorRate": 0.0513
}

═══════════════════════════════════════════════════════════════════

📚 DOCUMENTATION

Full guide: see VALIDATION_LOGGING.md

Files Modified:
✓ server/middleware/validationLogger.js (new) - Core logging logic
✓ server/middleware/validate.js (updated) - Enhanced with logging
✓ server/index.js (updated) - Added metrics endpoint
✓ server/.env.example (updated) - New environment variables

═══════════════════════════════════════════════════════════════════

🎯 NEXT STEPS

1. Test validation logging locally
2. Configure log aggregation (ELK, CloudWatch, Datadog)
3. Set up alerts for suspicious activity
4. Monitor error trends over time
5. Review logs during development for API improvements

═══════════════════════════════════════════════════════════════════
`);
