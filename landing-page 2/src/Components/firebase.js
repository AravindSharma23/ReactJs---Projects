// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-pnW56njfJTMWWPMlUPFNPxF_kgCLyug",
  authDomain: "ecommerce-5f280.firebaseapp.com",
  projectId: "ecommerce-5f280",
  storageBucket: "ecommerce-5f280.firebasestorage.app",
  messagingSenderId: "969245679504",
  appId: "1:969245679504:web:4ecceb44eb0c4715ed5d15",
  measurementId: "G-4JJFP3QGKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;