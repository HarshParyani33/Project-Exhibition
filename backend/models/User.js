const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    block: {
        type: String,
        required: true
    },
    roomNumber: {
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema); 