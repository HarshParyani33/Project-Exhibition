const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');

// Create the transporter after the imports
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Test the connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// Leave Request Schema
const leaveSchema = new mongoose.Schema({
    studentName: String,
    studentEmail: String,
    leaveType: String,
    visitingPlace: String,
    reason: String,
    fromDate: String,
    toDate: String,
    timeFrom: String,
    timeTo: String,
    proctorEmail: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Leave = mongoose.model('Leave', leaveSchema);

// Leave request route
router.post('/request', async (req, res) => {
    try {
        console.log('1. Received request:', req.body);
        
        const newLeave = await Leave.create(req.body);
        console.log('2. Created leave document:', newLeave);
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.proctorEmail,
            subject: `Leave Request from ${req.body.studentName}`,
            html: `
                <div>
                    <h2>New Leave Request</h2>
                    <p><strong>Student:</strong> ${req.body.studentName}</p>
                    <p><strong>Leave Type:</strong> ${req.body.leaveType}</p>
                    <p><strong>Start Date:</strong> ${req.body.fromDate} ${req.body.timeFrom}</p>
                    <p><strong>End Date:</strong> ${req.body.toDate} ${req.body.timeTo}</p>
                    <p><strong>Visiting Place:</strong> ${req.body.visitingPlace}</p>
                    <p><strong>Reason:</strong> ${req.body.reason}</p>
                    <br>
                    <p>Click to respond:</p>
                    <p>
                        APPROVE: http://localhost:5000/api/leave/approve/${newLeave._id}
                    </p>
                    <p>
                        REJECT: http://localhost:5000/api/leave/reject/${newLeave._id}
                    </p>
                </div>
            `
        };
        
        console.log('3. Sending email with ID:', newLeave._id);
        await transporter.sendMail(mailOptions);
        console.log('4. Email sent successfully');
        
        res.json({
            success: true,
            message: 'Leave request sent successfully!'
        });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update the approve route
router.get('/approve/:id', async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, { status: 'approved' });
        
        // Send notification to student
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: leave.studentEmail,
            subject: 'Leave Request Approved',
            html: `
                <div>
                    <h2>Leave Request Approved</h2>
                    <p>Your leave request has been approved!</p>
                    <p><strong>Details:</strong></p>
                    <p>From: ${leave.fromDate} ${leave.timeFrom}</p>
                    <p>To: ${leave.toDate} ${leave.timeTo}</p>
                    <p>Reason: ${leave.reason}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Approval notification sent to student');
        
        // Send HTML with script for popup
        res.send(`
            <script>
                alert('Leave request approved successfully!');
                window.close();
            </script>
        `);
    } catch (error) {
        console.error('Error:', error);
        res.send(`
            <script>
                alert('Error approving leave request');
                window.close();
            </script>
        `);
    }
});

// Update the reject route
router.get('/reject/:id', async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, { status: 'rejected' });
        
        // Send notification to student
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: leave.studentEmail,
            subject: 'Leave Request Rejected',
            html: `
                <div>
                    <h2>Leave Request Rejected</h2>
                    <p>Your leave request has been rejected.</p>
                    <p><strong>Details:</strong></p>
                    <p>From: ${leave.fromDate} ${leave.timeFrom}</p>
                    <p>To: ${leave.toDate} ${leave.timeTo}</p>
                    <p>Reason: ${leave.reason}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        
        // Send HTML with script for popup
        res.send(`
            <script>
                alert('Leave request rejected successfully!');
                window.close();
            </script>
        `);
    } catch (error) {
        console.error('Error:', error);
        res.send(`
            <script>
                alert('Error rejecting leave request');
                window.close();
            </script>
        `);
    }
});

// Add this new route to get leave status by student email
router.get('/status/:email', async (req, res) => {
    try {
        const leaves = await Leave.find({ studentEmail: req.params.email })
                                .sort({ createdAt: -1 }); // Most recent first
        res.json({
            success: true,
            leaves: leaves
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching leave status'
        });
    }
});

module.exports = router;
