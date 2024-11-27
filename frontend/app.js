// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// Function to check if email belongs to warden staff
function isWardenStaff(email) {
    const wardenPatterns = [
        'warden',
        'dywarden',
        'supervisor',
        'dy.warden',
        'deputy.warden',
        'hostel.warden'
    ];
    
    email = email.toLowerCase();
    return wardenPatterns.some(pattern => email.includes(pattern)) && email.endsWith('@vitbhopal.ac.in');
}

const studentLogin = document.getElementById('student-login');
studentLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        if (user.email.endsWith('@vitbhopal.ac.in')) {
            if (isWardenStaff(user.email)) {
                // If it's a warden trying to login through student portal
                auth.signOut();
                alert('Please use the Warden login portal');
            } else {
                console.log(user);
                window.location.replace('Student_Dashboard2.html');
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
    
    