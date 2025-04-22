import db from '../db.js';
import bcrypt from 'bcrypt';


const saltRounds = 10;

// User registration function
async function registerUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, hashedPassword];
    try {
        const result = await db.query(query, values);
        return result.rows[0]; // Return the newly created user
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// User find user
async function findUser(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
        const result = await db.query(query, values);
        return result.rows[0]; // Return the found user
    } catch (error) {
        console.error('Error finding user:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}


async function deleteUser(userId) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [userId];
    try {
        const result = await db.query(query, values);
        return result.rows[0]; // Return the deleted user
    }   catch (error) {         
        console.error('Error deleting user:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
} 

async function getAllUsers() {
    const query = 'SELECT * FROM users';
    try {
        const result = await db.query(query);
        return result.rows; // Return all users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

export { registerUser, deleteUser, getAllUsers, findUser };
