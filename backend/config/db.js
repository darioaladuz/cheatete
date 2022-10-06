require('dotenv').config();
const mongoose = require('mongoose');

const dbConfig = () => {
    mongoose.connect(process.env.DB_URI);
    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error(error);
    })
    db.once('open', () => {
        console.log('Connected to MongoDB');
    })
}

module.exports = dbConfig;