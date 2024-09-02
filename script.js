// common.js

// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('w-full');
}

// Function to handle form submission
function submitForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            
            fetch('/submit-form/', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                alert(`Form submitted successfully! Response: ${JSON.stringify(data)}`);
                // Clear the form after submission
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            });
        });
    }
}

// Function to display attendance records
function displayAttendanceRecords(records) {
    const tableBody = document.getElementById('attendance-table-body');
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentName}</td>
            <td>${record.attendanceDate}</td>
            <td>${record.present ? 'Present' : 'Absent'}</td>
            <td>${record.note || '-'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.querySelector('.dashboard');

    // Initialize charts
    initializeCharts();

    // Add event listener for sidebar toggle
    dashboard.addEventListener('click', () => {
        toggleSidebar();
    });

    // Fetch attendance records and display them
    fetchAttendanceRecords();
});

function initializeCharts() {
    // Initialize charts here
    // You can use libraries like Chart.js or D3.js for chart creation
}

function fetchAttendanceRecords() {
    fetch('/attendance-records/')
        .then(response => response.json())
        .then(records => {
            displayAttendanceRecords(records);
        })
        .catch(error => console.error('Error:', error));
}


// register-student.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('student-registration-form');

    if (registerForm) {
        submitForm('student-registration-form');
    }
});

function validateStudentRegistration(form) {
    const fields = form.querySelectorAll('.required-field');
    
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
        });
    });
}

// mark-attendance.js

document.addEventListener('DOMContentLoaded', () => {
    const attendanceForm = document.getElementById('attendance-marking-form');

    if (attendanceForm) {
        submitForm('attendance-marking-form');
    }

    initializeAttendancePicker();
});

function initializeAttendancePicker() {
    const datePicker = document.querySelector('#attendance-date-picker');
    datePicker.addEventListener('change', updateAttendanceDate);
}

function updateAttendanceDate(event) {
    const date = event.target.value;
    document.getElementById('attendance-date-display').textContent = date;
}

// view_attendance.js

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refresh-button');
    const attendanceTableBody = document.getElementById('attendance-table-body');

    // Initialize the page
    initializePage();

    // Add event listener for refresh button
    refreshButton.addEventListener('click', fetchAttendanceRecords);
});

function initializePage() {
    // Fetch initial attendance records
    fetchAttendanceRecords();
}

function fetchAttendanceRecords() {
    fetch('/attendance-records/')
        .then(response => response.json())
        .then(records => {
            displayAttendanceRecords(records);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching attendance records.');
        });
}

function displayAttendanceRecords(records) {
    const tableBody = document.getElementById('attendance-table-body');
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentName}</td>
            <td>${record.attendanceDate}</td>
            <td>${record.present ? 'Present' : 'Absent'}</td>
            <td>${record.note || '-'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function toggleAttendanceStatus(record) {
    const statusCell = record.querySelector('td:nth-child(3)');
    const noteInput = record.querySelector('input[type="text"]');
    const noteSpan = record.querySelector('td:nth-child(4)');
    
    if (noteInput.value.trim() === '') {
        statusCell.textContent = 'Absent';
        noteSpan.style.display = 'none';
        noteInput.style.display = 'none';
    } else {
        statusCell.textContent = 'Present';
        noteSpan.style.display = '';
        noteInput.style.display = '';
    }
}


// admin_dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.querySelector('.dashboard');
    const welcomeSection = document.getElementById('welcome');
    const statsSection = document.getElementById('stats');
    const actionsSection = document.getElementById('actions');

    initializeDashboard();

    // Add event listeners
    dashboard.addEventListener('click', toggleSidebar);
});

function initializeDashboard() {
    // Fetch initial statistics
    fetchStatistics().then(stats => displayStatistics(stats));

    // Initialize quick action buttons
    initializeQuickActions();
}

async function fetchStatistics() {
    try {
        const response = await fetch('/admin-dashboard-stats/');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching statistics:', error);
        alert('Failed to load dashboard statistics.');
        return {};
    }
}

function displayStatistics(stats) {
    const totalStudentsSpan = document.getElementById('total-students-count');
    const activeUsersSpan = document.getElementById('active-users-count');
    const dailyLoginsSpan = document.getElementById('daily-logins-count');

    totalStudentsSpan.textContent = stats.total_students || '-';
    activeUsersSpan.textContent = stats.active_users || '-';
    dailyLoginsSpan.textContent = stats.daily_logins || '-';
}

function initializeQuickActions() {
    const generateReportButton = document.getElementById('generate-report-button');
    const managePermissionsButton = document.getElementById('manage-permissions-button');

    generateReportButton.addEventListener('click', () => {
        alert('Generating attendance report...');
        // Add logic to generate and download report
    });

    managePermissionsButton.addEventListener('click', () => {
        alert('Managing user permissions...');
        // Add logic to manage user permissions
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('w-full');
}