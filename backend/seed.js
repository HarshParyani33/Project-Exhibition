const mongoose = require('mongoose');
const UserModel = require('./models/User'); // Adjust the path to your User model

// Replace with your MongoDB Atlas connection string
const uri = 'mongodb+srv://hostelconnectvit:Harsh%40123@cluster0.jkw2v.mongodb.net/hostelconnect?retryWrites=true&w=majority'
mongoose.connect(uri)
.then(async () => {
    console.log('MongoDB connected');

    // Sample data
    const sampleUsers = [
        {
            studentId: '23BCE99999',
            Name: 'Harsh Paryani',
            block: 'Boys Hostel Block 1',
            roomNumber: '101',
            proctorEmail: 'proctor1@vitbhopal.ac.in',
            phone: '1234567890',
            fatherName: 'John Doe',
            fatherPhone: '0987654321',
            permanentAddress: '123 Main St, Bhopal, MP',
            email :"johnDoe@example.com",
            uid:"unique-user-id"
        },
        {
            studentId: '23BCE99998',
            Name:'Sai Pallavi',
            block: 'Girls Hostel Block 2',
            roomNumber: '202',
            proctorEmail: 'proctor2@vitbhopal.ac.in',
            phone: '2345678901',
            fatherName: 'Jane Doe',
            fatherPhone: '9876543210',
            permanentAddress: '456 Elm St, Bhopal, MP',
            email :"johnDoen@example.com",
            uid:"unique-users-id"
        },
        // Add more sample users as needed
    ];

    // Insert sample data
    try {
        await UserModel.insertMany(sampleUsers);
        console.log('Sample data inserted');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    } finally {
        mongoose.connection.close();
    }
})
.catch(err => console.error('MongoDB connection error:', err));