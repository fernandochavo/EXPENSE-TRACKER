import {
  createTransaction,
  getAllTransactions,
} from "../Models/transactionModel";

async function createTransactionController(req, res) {
  const { categoryId, amount, date, description } = req.body;
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    const newTransaction = await createTransaction(
      userId,
      categoryId,
      amount,
      date,
      description
    );
    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllTransactionsController(req, res) {
  const userId = req.user.id; // Assuming you have user ID from authentication middleware

  try {
    const transactions = await getAllTransactions(userId);
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { createTransactionController, getAllTransactionsController };