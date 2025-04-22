import express from 'express';
import{ createTransactionController, getAllTransactionsController } from '../Controllers/transactionController.js';

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session.userId) return next();
  res.redirect("/login");
}

router.post('/transactions', isLoggedIn, createTransactionController);
router.get('/transactions', isLoggedIn, getAllTransactionsController);

export default router;