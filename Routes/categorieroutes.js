import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from '../Controllers/categorieController.js';
import e from 'express';

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session.userId) return next();
  res.redirect("/login");
}

router.post('/', isLoggedIn, createCategory); // Create a new category
router.get('/',  isLoggedIn, getAllCategories); // Get all categories
router.get('/:id', isLoggedIn, getCategoryById); // Get a category by ID

export default router;