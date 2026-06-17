/**
 * Transaction Helper Utilities
 * Provides wrapper functions for MongoDB transactions
 * Only use when multiple documents/collections must succeed or fail together
 */

const mongoose = require("mongoose");

/**
 * Execute a database operation within a transaction
 * @param {Function} operation - Async function containing the transaction logic
 * @returns {Promise<any>} - Result of the operation
 * @throws {Error} - If transaction fails or operation throws
 *
 * Usage:
 *   const result = await withTransaction(async (session) => {
 *     await Order.create([{...}], { session });
 *     await Product.updateOne({...}, {...}, { session });
 *     return result;
 *   });
 */
async function withTransaction(operation) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await operation(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}

/**
 * Execute multiple operations atomically
 * Useful for coordinating updates across different models
 * @param {Array<Function>} operations - Array of async functions
 * @returns {Promise<Array>} - Results from each operation
 */
async function withTransactionMultiple(operations) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const results = [];
    for (const operation of operations) {
      results.push(await operation(session));
    }
    await session.commitTransaction();
    return results;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}

module.exports = {
  withTransaction,
  withTransactionMultiple,
};
