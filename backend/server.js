const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Add your frontend URL here
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://hostelconnectvit:Harsh%40123@cluster0.jkw2v.mongodb.net/hostelconnect?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


// Add this before your routes
app.use((req, res, next) => {
    console.log('Request:', {
        method: req.method,
        path: req.path,
        body: req.body
    });
    next();
});

// Other Routes
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

// Add detailed error handling
app.use((err, req, res, next) => {
    console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        body: req.body
    });
    
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
