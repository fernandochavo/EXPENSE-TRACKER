import express from 'express';
import{ createTransactionController, getAllTransactionsController } from '../Controllers/transactionController.js';

const router = express.Router();

router.post('/transactions', createTransactionController);
router.get('/transactions', getAllTransactionsController);