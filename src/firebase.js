// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMn2iqE3hDPvH95kvXGrcqIpT6iYFO4lc",
  authDomain: "realshare-landing.firebaseapp.com",
  projectId: "realshare-landing",
  storageBucket: "realshare-landing.firebasestorage.app",
  messagingSenderId: "824584548370",
  appId: "1:824584548370:web:a248233a546e2c8ed4a8cb",
  measurementId: "G-2054F2YTQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);