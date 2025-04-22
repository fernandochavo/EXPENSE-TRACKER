import db from '../db.js';

async function createCategory(name,type,userId) {
    const query = 'INSERT INTO categories (name, type, user_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, type, userId];
    // Ensure that the userId is a valid integer
    if (isNaN(userId)) {
        throw new Error('Invalid user ID');
    }
    try {
        const result = await db.query(query, values);
        return result.rows[0]; // Return the newly created category
    } catch (error) {
        console.error('Error creating category:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
} 

async function getAllCategories(userId) {
    const query = 'SELECT * FROM categories WHERE user_id = $1';
    const values = [userId];
    try {
        const result = await db.query(query, values);
        return result.rows; // Return all categories for the user   
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

async function getCategoryById(categoryId) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const values = [categoryId];
    try {
        const result = await db.query(query, values);
        return result.rows[0]; // Return the category with the specified ID
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export { createCategory, getAllCategories, getCategoryById };