// submitComplaint.js
async function submitComplaint(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const location = document.getElementById('location').value;
    const details = document.getElementById('details').value;

    const complaintData = {
        subject,
        location,
        details
    };

    try {
        const response = await fetch('http://localhost:5000/api/complaints/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(complaintData),
        });

        const data = await response.json();

        if (data.success) {
            alert('Complaint submitted successfully');
            document.getElementById('complaintForm').reset();
            loadComplaints(); // Refresh the complaints list
        } else {
            alert('Error submitting complaint: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting complaint: ' + error.message);
    }
}

// Attach the submitComplaint function to the form
document.getElementById('complaintForm').addEventListener('submit', submitComplaint);

// Add this new function to fetch and display complaints
async function loadComplaints() {
    try {
        const response = await fetch('http://localhost:5000/api/complaints/all');
        const data = await response.json();
        
        if (data.success) {
            displayComplaints(data.complaints);
        } else {
            console.error('Error fetching complaints:', data.message);
        }
    } catch (error) {
        console.error('Error fetching complaints:', error);
    }
}

function displayComplaints(complaints) {
    const complaintsList = document.querySelector('.complaints-list');
    complaintsList.innerHTML = ''; // Clear existing complaints

    complaints.forEach((complaint, index) => {
        const date = new Date(complaint.dateSubmitted).toLocaleDateString();
        const card = `
            <div class="complaint-card">
                <div class="complaint-main">
                    <div class="complaint-info">
                        <span class="complaint-id">#CM${String(index + 1).padStart(3, '0')}</span>
                        <span class="status-badge ${complaint.status.toLowerCase()}">${complaint.status}</span>
                    </div>
                    <button class="details-toggle" onclick="toggleDetails(this)">Details</button>
                </div>
                
                <div class="complaint-details">
                    <div class="details-content">
                        <p><strong>Subject:</strong> ${complaint.subject}</p>
                        <p><strong>Date Submitted:</strong> ${date}</p>
                        <p><strong>Location:</strong> ${complaint.location}</p>
                        <p><strong>Description:</strong> ${complaint.details}</p>
                    </div>
                </div>
            </div>
        `;
        complaintsList.innerHTML += card;
    });
}

// Load complaints when page loads
document.addEventListener('DOMContentLoaded', loadComplaints);
