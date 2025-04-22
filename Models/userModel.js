import db from '../db.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { session } from 'passport';


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
