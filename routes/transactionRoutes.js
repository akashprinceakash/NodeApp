const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions for a user with filters (status, date range, type, pagination)
router.get('/transactions', async (req, res) => {
    const { status, type, page = 1, limit = 10, fromDate, toDate, userId } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (type) filters.type = type;
    if (fromDate && toDate) filters.transactionDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    if (userId) filters.userId = userId;

    try {
        const skip = (page - 1) * limit;
        const transactions = await Transaction.find(filters).skip(skip).limit(Number(limit));
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
