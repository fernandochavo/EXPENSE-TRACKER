import db from '../db.js';

async function createTransaction(userId, categoryId, amount, date, description) {
    const query =
      "INSERT INTO transactions (user_id, category_id, amount, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [userId, categoryId, amount, description, date];
    // Ensure that the userId and categoryId are valid integers
    if (isNaN(userId) || isNaN(categoryId)) {
        throw new Error('Invalid user ID or category ID');
    }
    try {
        const result = await db.query(query, values);
        return result.rows[0]; // Return the newly created transaction
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}
async function getAllTransactions(userId) {
    const query = 'SELECT * FROM transactions WHERE user_id = $1';
    const values = [userId];
    try {
        const result = await db.query(query, values);
        return result.rows; // Return all transactions for the user
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export { createTransaction, getAllTransactions };