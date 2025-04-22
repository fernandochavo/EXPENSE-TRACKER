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

// User login function
async function loginUser(username, password) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
        const result = await db.query(query, values);
        const user = result.rows[0];
        if (user && await bcrypt.compare(password, user.password)) {
            return user; // Return the authenticated user
        } else {
            throw new Error('Invalid username or password');
        }
    }   catch (error) { 
        console.error('Error logging in user:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

