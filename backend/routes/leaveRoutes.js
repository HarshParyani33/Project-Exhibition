const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave'); // Import the Leave model
const nodemailer = require('nodemailer'); // Import nodemailer
require('dotenv').config(); // Load environment variables

// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Route to create a new leave request
router.post('/request', async (req, res) => {
    try {
        const leaveData = req.body; // Get the leave data from the request body
        const newLeave = new Leave(leaveData); // Create a new Leave instance

        // Save the leave request to the database
        const savedLeave = await newLeave.save();

        // Prepare email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: leaveData.proctorEmail, // Send to the proctor's email
            subject: `Leave Request from ${leaveData.Name}`,
            html: `
                <h2>New Leave Request</h2>
                <p><strong>Student Name:</strong> ${leaveData.Name}</p>
                <p><strong>Student Email:</strong> ${leaveData.studentEmail}</p>
                <p><strong>Leave Type:</strong> ${leaveData.leaveType}</p>
                <p><strong>Visiting Place:</strong> ${leaveData.visitingPlace}</p>
                <p><strong>Reason:</strong> ${leaveData.reason}</p>
                <p><strong>From Date:</strong> ${leaveData.fromDate}</p>
                <p><strong>To Date:</strong> ${leaveData.toDate}</p>
                <p><strong>Time From:</strong> ${leaveData.timeFrom}</p>
                <p><strong>Time To:</strong> ${leaveData.timeTo}</p>
                <p><strong>Phone:</strong> ${leaveData.phone}</p>
                <p><strong>Father's Name:</strong> ${leaveData.fatherName}</p>
                <p><strong>Father's Phone:</strong> ${leaveData.fatherPhone}</p>
                <p><strong>Permanent Address:</strong> ${leaveData.permanentAddress}</p>
                <br>
                <p>Click to respond:</p>
                <a href="http://localhost:5000/api/leave/approve/${newLeave._id}" style="padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px;">Approve</a>
                <a href="http://localhost:5000/api/leave/reject/${newLeave._id}" style="padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">Reject</a>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            data: savedLeave
        });
    } catch (error) {
        console.error('Error creating leave request:', error);
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
