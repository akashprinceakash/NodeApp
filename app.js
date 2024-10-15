const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
