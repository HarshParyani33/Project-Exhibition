const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

// Route to save/update user profile
router.post('/', async (req, res) => {
    try {
        console.log('Received profile data:', req.body);

        // Try to find existing user by email
        const existingUser = await UserModel.findOne({ email: req.body.email });

        let userData;
        if (existingUser) {
            // Update existing user
            userData = await UserModel.findOneAndUpdate(
                { email: req.body.email },
                req.body,
                { new: true } // Return updated document
            );
        } else {
            // Create new user
            userData = await UserModel.create(req.body);
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
        const user = await UserModel.findOne({ email: req.params.email });
        
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

// Route to add a new user
router.post('/api/users', async (req, res) => {
    const userData = req.body;

    try {
        const newUser = new UserModel(userData);
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});

module.exports = router; 