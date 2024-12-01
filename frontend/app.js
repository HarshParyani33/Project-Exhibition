// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxVv_x37mrA6PiTZASQfyCiibxkzz5GFc",
    authDomain: "hostel-connect-login.firebaseapp.com",
    projectId: "hostel-connect-login",
    storageBucket: "hostel-connect-login.firebasestorage.app",
    messagingSenderId: "814264090085",
    appId: "1:814264090085:web:5e2c18177f778d93f3830c",
    measurementId: "G-J5RC2531WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    'hd': 'vitbhopal.ac.in'
});
const auth = getAuth(app);
auth.languageCode = 'en';
const db = getFirestore(app);

// Function to check if email belongs to warden staff
function isWardenStaff(email) {
    const wardenPatterns = [
        'warden',
        'dywarden',
        'supervisor',
        'dy.warden',
        'deputy.warden',
        'hostel.warden',
        'harsh'
    ];
    
    email = email.toLowerCase();
    return wardenPatterns.some(pattern => email.includes(pattern)) && email.endsWith('@vitbhopal.ac.in');
}

const studentLogin = document.getElementById('student-login');
studentLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
    .then(async (result) => {
        const user = result.user;
        if (user.email.endsWith('@vitbhopal.ac.in')) {
            if (isWardenStaff(user.email)) {
                auth.signOut();
                alert('Please use the Warden login portal');
            } else {
                // Check if user exists in Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (!userDoc.exists()) {
                    // First time user
                    window.location.replace('first_time_login.html');
                } else {
                    // Returning user
                    window.location.replace('Student_Dashboard2.html');
                }
            }
        } else {
            auth.signOut();
            alert('Please use your VIT Bhopal email address to login');
        }
    }).catch((error) => {
        console.error(error);
        alert('Login failed. Please use your VIT Bhopal email address.');
    });
});

const facultyLogin = document.getElementById('faculty-login');
facultyLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        if (user.email.endsWith('@vitbhopal.ac.in')) {
            if (isWardenStaff(user.email)) {
                console.log(user);
                window.location.replace('faculty_dashboard.html');
            } else {
                // If it's a student/other faculty trying to login through warden portal
                auth.signOut();
                alert('Access denied. This portal is only for Hostel Wardens and Supervisors.');
            }
        } else {
            auth.signOut();
            alert('Please use your VIT Bhopal email address to login');
        }
    }).catch((error) => {
        console.error(error);
        alert('Login failed. Please use your VIT Bhopal email address.');
    });
});

document.getElementById('first-time-login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        studentId: document.getElementById('studentId').value,
        studentName: document.getElementById('studentName').value,
        proctorEmail: document.getElementById('proctorEmail').value,
        // Add other fields as needed
    };

    try {
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (data.success) {
            alert('Details saved successfully!');
            window.location.href = 'Student_Dashboard2.html';
        } else {
            alert('Error saving details');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving details');
    }
});
    
    