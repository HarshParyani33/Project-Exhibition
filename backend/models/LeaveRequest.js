const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    visitingPlace: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    proctorEmail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    fatherPhone: {
    type: String,
    required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTo: {
        type: String,
        required: true
    },
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

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
