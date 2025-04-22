import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from "../models/categorieModel.js";

async function createCategory(req, res) {
  const { name, type } = req.body;
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    const newCategory = await createCategory(name, type, userId);
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllCategories(req, res) {
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    const categories = await getAllCategories(userId);
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getCategoryById(req, res) {
  const categoryId = req.params.id;

  try {
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
