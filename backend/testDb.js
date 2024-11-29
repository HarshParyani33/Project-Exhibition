require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        // Create a test document
        return mongoose.connection.db.collection('test').insertOne({
            test: 'Hello MongoDB!',
            date: new Date()
        });
    })
    .then(result => {
        console.log('Test document inserted:', result);
        return mongoose.connection.close();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
