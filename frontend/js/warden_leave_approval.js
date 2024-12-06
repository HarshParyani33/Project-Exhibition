document.addEventListener('DOMContentLoaded', function() {
    // Sample data - Replace with actual API call
    const leaveRequests = [
        {
            id: 1,
            studentName: "Rohit Kumar",
            studentId: "21BCE1001",
            block: "1",
            roomNo: "101",
            proctorEmail: "rohan.kumar@vitbhopal.ac.in",
            outDate: "2024-03-15 09:00",
            inDate: "2024-03-18 18:00",
            proctorStatus: "approved",
            status: "pending",
            reason: "Family function",
            contactNo: "9876543210",
            parentContact: "9876543211"
        },
        {
            id: 2,
            studentName: "Rajesh Kumar",
            studentId: "21BCE1002",
            block: "2",
            roomNo: "202",
            proctorEmail: "rohit.kumar@vitbhopal.ac.in",
            outDate: "2024-03-16 10:00",
            inDate: "2024-03-17 20:00",
            proctorStatus: "approved",
            status: "approved",
            reason: "Medical appointment",
            contactNo: "9876543212",
            parentContact: "9876543213"
        },
        {
            id: 3,
            studentName: "Sanvi Singh",
            studentId: "21BCE1003",
            block: "1",
            roomNo: "303",
            proctorEmail: "rohan@vitbhopal.ac.in",
            outDate: "2024-03-18 08:00",
            inDate: "2024-03-20 18:00",
            proctorStatus: "pending",
            status: "pending",
            reason: "Sister's wedding",
            contactNo: "9876543214",
            parentContact: "9876543215"
        },
        {
            id: 4,
            studentName: "Ruchika Lodhi",
            studentId: "21BCE1004",
            block: "2",
            roomNo: "404",
            proctorEmail: "pragati.kumari@vitbhopal.ac.in",
            outDate: "2024-03-17 14:00",
            inDate: "2024-03-19 20:00",
            proctorStatus: "approved",
            status: "approved",
            reason: "Family emergency",
            contactNo: "9876543216",
            parentContact: "9876543217"
        },
        {
            id: 5,
            studentName: "Smriti Bisht",
            studentId: "21BCE1005",
            block: "1",
            roomNo: "105",
            proctorEmail: "nivedya@vitbhopal.ac.in",
            outDate: "2024-03-19 09:00",
            inDate: "2024-03-21 18:00",
            proctorStatus: "rejected",
            status: "rejected",
            reason: "Personal work",
            contactNo: "9876543218",
            parentContact: "9876543219"
        }
    ];

    // Function to format date and time
    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Populate table with data
    function populateTable(data) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';

        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.block}</td>
                <td>
                    <div class="student-info">
                        <div class="student-name">${item.studentName}</div>
                        <div class="student-id">${item.studentId}</div>
                    </div>
                </td>
                <td>${item.proctorEmail}</td>
                <td>${formatDateTime(item.outDate)}</td>
                <td>${formatDateTime(item.inDate)}</td>
                <td><span class="badge badge-${item.proctorStatus}">${item.proctorStatus}</span></td>
                <td><span class="badge badge-${item.status}">${item.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-success" onclick="approveLeave(${item.id})" 
                                data-bs-toggle="tooltip" title="Approve">
                            <i class="bi bi-check-lg"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="rejectLeave(${item.id})"
                                data-bs-toggle="tooltip" title="Reject">
                            <i class="bi bi-x-lg"></i>
                        </button>
                        <button class="btn btn-sm btn-info" onclick="viewDetails(${item.id})"
                                data-bs-toggle="tooltip" title="View Details">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Reinitialize tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    }

    // View details function
    window.viewDetails = function(id) {
        const leave = leaveRequests.find(item => item.id === id);
        const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">Leave Request Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Student Name:</label>
                        <span>${leave.studentName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Student ID:</label>
                        <span>${leave.studentId}</span>
                    </div>
                    <div class="detail-item">
                        <label>Block & Room:</label>
                        <span>Block ${leave.block}, Room ${leave.roomNo}</span>
                    </div>
                    <div class="detail-item">
                        <label>Contact Number:</label>
                        <span>${leave.contactNo}</span>
                    </div>
                    <div class="detail-item">
                        <label>Parent Contact:</label>
                        <span>${leave.parentContact}</span>
                    </div>
                    <div class="detail-item">
                        <label>Proctor Email:</label>
                        <span>${leave.proctorEmail}</span>
                    </div>
                    <div class="detail-item">
                        <label>Out Date & Time:</label>
                        <span>${formatDateTime(leave.outDate)}</span>
                    </div>
                    <div class="detail-item">
                        <label>In Date & Time:</label>
                        <span>${formatDateTime(leave.inDate)}</span>
                    </div>
                    <div class="detail-item full-width">
                        <label>Reason:</label>
                        <span>${leave.reason}</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                ${leave.status === 'pending' ? `
                    <button type="button" class="btn btn-success" onclick="approveLeave(${leave.id})">Approve</button>
                    <button type="button" class="btn btn-danger" onclick="rejectLeave(${leave.id})">Reject</button>
                ` : ''}
            </div>
        `;

        const modalDialog = document.querySelector('#leaveDetailsModal .modal-content');
        modalDialog.innerHTML = modalContent;
        const modal = new bootstrap.Modal(document.getElementById('leaveDetailsModal'));
        modal.show();
    };

    // Enhanced filter and sort functionality
    function filterAndSortData() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const blockFilter = document.getElementById('blockFilter').value;
        const statusFilter = document.getElementById('statusFilter').value.toLowerCase();

        let filteredData = leaveRequests.filter(item => {
            const matchesSearch = 
                item.studentName.toLowerCase().includes(searchTerm) ||
                item.studentId.toLowerCase().includes(searchTerm) ||
                item.block.toLowerCase().includes(searchTerm);
            
            const matchesBlock = !blockFilter || item.block === blockFilter;
            const matchesStatus = !statusFilter || item.status.toLowerCase() === statusFilter;

            return matchesSearch && matchesBlock && matchesStatus;
        });

        // Sort by block if block filter is selected
        if (blockFilter) {
            filteredData.sort((a, b) => {
                // First sort by block
                const blockCompare = a.block.localeCompare(b.block);
                if (blockCompare !== 0) return blockCompare;
                
                // Then by student name
                return a.studentName.localeCompare(b.studentName);
            });
        }

        return filteredData;
    }

    // Update table with filtered and sorted data
    function updateTable() {
        const filteredData = filterAndSortData();
        populateTable(filteredData);
        updatePagination(filteredData.length);
    }

    // Event listeners for filters
    document.getElementById('searchInput').addEventListener('input', updateTable);
    document.getElementById('blockFilter').addEventListener('change', updateTable);
    document.getElementById('statusFilter').addEventListener('change', updateTable);

    // Refresh button functionality
    document.getElementById('refreshBtn').addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
        document.getElementById('blockFilter').value = '';
        document.getElementById('statusFilter').value = '';
        updateTable();
    });

    // Update pagination info
    function updatePagination(totalItems) {
        const itemsPerPage = 10;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        document.querySelector('.entries-info').innerHTML = `
            Showing <span>1</span> to <span>${Math.min(itemsPerPage, totalItems)}</span> 
            of <span>${totalItems}</span> entries
        `;

        // Update pagination buttons
        const pagination = document.querySelector('.pagination');
        let paginationHTML = `
            <li class="page-item ${totalItems <= itemsPerPage ? 'disabled' : ''}">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
        `;

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${i === 1 ? 'active' : ''}">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `;
        }

        paginationHTML += `
            <li class="page-item ${totalItems <= itemsPerPage ? 'disabled' : ''}">
                <a class="page-link" href="#">Next</a>
            </li>
        `;

        pagination.innerHTML = paginationHTML;
    }

    // Initial table load
    updateTable();
});

// Approve leave function
function approveLeave(id) {
    const leave = leaveRequests.find(item => item.id === id);
    if (confirm(`Are you sure you want to approve leave request for ${leave.studentName}?`)) {
        leave.status = 'approved';
        updateTable();
        // Here you would make an API call to update the status
    }
}

// Reject leave function
function rejectLeave(id) {
    const leave = leaveRequests.find(item => item.id === id);
    if (confirm(`Are you sure you want to reject leave request for ${leave.studentName}?`)) {
        leave.status = 'rejected';
        updateTable();
        // Here you would make an API call to update the status
    }
} 