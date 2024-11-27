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
    'hd': 'vitbhopal.ac.in' // This restricts to @vitbhopal.ac.in emails only
});
const auth = getAuth(app);
auth.languageCode = 'en';

const studentLogin = document.getElementById('student-login');
studentLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        // Check if email ends with @vitbhopal.ac.in
        if (user.email.endsWith('@vitbhopal.ac.in')) {
            console.log(user);
            window.location.replace('Student_Dashboard2.html');
        } else {
            // Sign out the user if not from vitbhopal.ac.in
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
        // Check if email ends with @vitbhopal.ac.in
        if (user.email.endsWith('@vitbhopal.ac.in')) {
            console.log(user);
            window.location.replace('faculty_dashboard.html');
        } else {
            // Sign out the user if not from vitbhopal.ac.in
            auth.signOut();
            alert('Please use your VIT Bhopal email address to login');
        }
    }).catch((error) => {
        console.error(error);
        alert('Login failed. Please use your VIT Bhopal email address.');
    });
});
    
    