const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Submit a new complaint
router.post('/submit', async (req, res) => {
    try {
        const { subject, location, details, studentEmail } = req.body;
        
        const newComplaint = new Complaint({
            subject,
            location,
            details,
            studentEmail
        });

        const savedComplaint = await newComplaint.save();
        
        res.status(201).json({
            success: true,
            data: savedComplaint
        });
    } catch (error) {
        console.error('Error submitting complaint:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get complaints by student email
router.get('/student/:email', async (req, res) => {
    try {
        const complaints = await Complaint.find({ studentEmail: req.params.email })
                                        .sort({ dateSubmitted: -1 });
        res.json({
            success: true,
            complaints
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all complaints for admin/faculty
router.get('/all', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ dateSubmitted: -1 });
        res.json({
            success: true,
            complaints
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update complaint status
router.patch('/status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        res.json({
            success: true,
            data: complaint
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all complaints for warden view
router.get('/warden', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ dateSubmitted: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;