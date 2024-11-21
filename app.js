
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const auth = getAuth(app);
  auth.languageCode = 'en';
//   const analytics = getAnalytics(app);

const studentLogin = document.getElementById('student-login');
studentLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user);
    window.location.replace('Student_Dashboard2.html');
  }).catch((error) => {
    // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    });
    
    const facultyLogin = document.getElementById('faculty-login');
    facultyLogin.addEventListener('click', () => {
        signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(user);
        window.location.replace(''); //add faculty page link(path) here
      }).catch((error) => {
        // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        });
        
    