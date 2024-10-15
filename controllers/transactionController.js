const Transaction = require('../models/Transaction');

exports.getTransactionsByUserId = async (req, res) => {
    const { id } = req.params;
    const { status, fromDate, toDate, type } = req.query;
    
    const filters = { userId: id };
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (fromDate && toDate) {
        filters.transactionDate = {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
        };
    }

    try {
        const transactions = await Transaction.find(filters).exec();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTransactionsWithUserDetails = async (req, res) => {
    const { status, fromDate, toDate, type } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (fromDate && toDate) {
        filters.transactionDate = {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
        };
    }

    try {
        const transactions = await Transaction.aggregate([
            { $match: filters },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' }
        ]).exec();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
