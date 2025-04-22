import {
  findUser,
  registerUser,
  deleteUser,
  getAllUsers,
} from "../Models/userModel";
import bcrypt from "bcrypt";

async function register(req, res) {
    const { username, password } = req.body;
    try {
        const existingUser = await findUser(username);
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const newUser = await registerUser(username, password);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await findUser(username);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteUserController(req, res) {
    const userId = req.params.id;
    try {
        const deletedUser = await deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}