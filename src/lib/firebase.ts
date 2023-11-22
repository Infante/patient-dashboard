// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKQVGTVRZ1gFwvwE0AcO6u8E2_nHVzK60",
    authDomain: "finni-demo.firebaseapp.com",
    projectId: "finni-demo",
    storageBucket: "finni-demo.appspot.com",
    messagingSenderId: "435890135645",
    appId: "1:435890135645:web:a3bb06e9b00bfb910c23b4",
    measurementId: "G-2TN3XZ25ZW",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app) // Initialize Firestore

export { app, auth, firestore }
