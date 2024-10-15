const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    status: { type: String, enum: ['success', 'pending', 'failed'] },
    type: { type: String, enum: ['debit', 'credit'] },
    transactionDate: { type: Date, default: Date.now },
    amount: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Transaction', transactionSchema);
