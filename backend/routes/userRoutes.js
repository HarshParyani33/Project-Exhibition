const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Create User Schema
const userSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    email: { type: String, unique: true },
    block: String,
    roomNumber: String,
    proctorEmail: String,
    phone: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Route to save/update user profile
router.post('/', async (req, res) => {
    try {
        console.log('Received profile data:', req.body);

        // Try to find existing user by email
        const existingUser = await User.findOne({ email: req.body.email });

        let userData;
        if (existingUser) {
            // Update existing user
            userData = await User.findOneAndUpdate(
                { email: req.body.email },
                req.body,
                { new: true } // Return updated document
            );
        } else {
            // Create new user
            userData = await User.create(req.body);
        }
        
        console.log('Saved user data:', userData);

        res.json({
            success: true,
            message: 'Profile saved successfully',
            data: userData
        });
    } catch (error) {
        console.error('Profile save error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get user profile route
router.get('/:email', async (req, res) => {
    try {
        console.log('Searching for user with email:', req.params.email);
        const user = await User.findOne({ email: req.params.email });
        
        if (user) {
            console.log('User found:', user);
            res.json({
                success: true,
                data: user
            });
        } else {
            console.log('No user found with email:', req.params.email);
            res.json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router; 