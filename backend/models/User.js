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
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel; 