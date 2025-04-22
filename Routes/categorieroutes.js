import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from '../Controllers/categoryController.js';

const router = express.Router();

router.post('/', createCategory); // Create a new category
router.get('/', getAllCategories); // Get all categories
router.get('/:id', getCategoryById); // Get a category by ID