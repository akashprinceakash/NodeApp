const mongoose = require('mongoose');
const User = require('./models/User');         // Import User model
const Transaction = require('./models/Transaction'); // Import Transaction model
require('dotenv').config();                    // To use environment variables

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

// Sample Data
const users = [
    { name: 'John Doe', phoneNumber: '1234567890' },
    { name: 'Jane Doe', phoneNumber: '0987654321' },
    { name: 'Alice Smith', phoneNumber: '1112223333' },
    { name: 'Bob Johnson', phoneNumber: '4445556666' },
    { name: 'Charlie Brown', phoneNumber: '7778889999' },
    { name: 'David Lee', phoneNumber: '9998887777' },
    { name: 'Emily White', phoneNumber: '6665554444' },
    { name: 'Frank Green', phoneNumber: '3332221111' },
    { name: 'Grace Black', phoneNumber: '5554443333' },
    { name: 'Hannah Blue', phoneNumber: '8887776666' },
];

const transactions = (userId) => [
    { status: 'success', type: 'debit', transactionDate: new Date(), amount: 500, userId },
    { status: 'pending', type: 'credit', transactionDate: new Date(), amount: 1500, userId },
    { status: 'failed', type: 'debit', transactionDate: new Date(), amount: 2000, userId },
    { status: 'success', type: 'credit', transactionDate: new Date(), amount: 1000, userId },
    { status: 'success', type: 'debit', transactionDate: new Date(), amount: 800, userId },
];

// Seed Function
const seedDB = async () => {
    await connectDB();

    try {
        // Delete existing data (if needed)
        await User.deleteMany({});
        await Transaction.deleteMany({});
        console.log('Existing data deleted');

        // Insert Users
        const insertedUsers = await User.insertMany(users);
        console.log('Users seeded successfully');

        // Insert Transactions for each user
        for (let user of insertedUsers) {
            const userTransactions = transactions(user._id);
            await Transaction.insertMany(userTransactions);
        }
        console.log('Transactions seeded successfully');
    } catch (error) {
        console.error(error.message);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seed function
seedDB();
