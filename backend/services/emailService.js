const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendLeaveRequestEmail(leaveRequest) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: leaveRequest.proctorEmail,
            subject: `Leave Request from ${leaveRequest.studentName}`,
            html: `
                <h2>New Leave Request</h2>
                <p><strong>Student Name:</strong> ${leaveRequest.studentName}</p>
                <p><strong>Leave Type:</strong> ${leaveRequest.leaveType}</p>
                <p><strong>Visiting Place:</strong> ${leaveRequest.visitingPlace}</p>
                <p><strong>Reason:</strong> ${leaveRequest.reason}</p>
                <p><strong>From:</strong> ${leaveRequest.fromDate.toLocaleDateString()} ${leaveRequest.timeFrom}</p>
                <p><strong>To:</strong> ${leaveRequest.toDate.toLocaleDateString()} ${leaveRequest.timeTo}</p>
                <p><strong>Phone:</strong> ${leaveRequest.phone}</p>
                <p><strong>Father's Name:</strong> ${leaveRequest.fatherName}</p>
                <p><strong>Father's Contact:</strong> ${leaveRequest.fatherPhone}</p>
                <p><strong>Permanent Address:</strong> ${leaveRequest.permanentAddress}</p>
                <div style="margin-top: 20px;">
                    <a href="${process.env.FRONTEND_URL}/approve/${leaveRequest._id}" 
                       style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; margin-right: 10px;">
                       Approve
                    </a>
                    <a href="${process.env.FRONTEND_URL}/reject/${leaveRequest._id}" 
                       style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none;">
                       Reject
                    </a>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Leave request email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();
