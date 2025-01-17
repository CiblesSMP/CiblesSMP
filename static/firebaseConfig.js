import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firbase Config
// Yes, I know, the API key is just sitting there, waiting to be used for evil. However, I have the entire firebase app literally set up so the only thing you can change is the view counter. You can only increment it by one per request. So if you want your IP address blown off the face of the earth by Google Firebase, I dare you to set the view count to 69,000.
export const firebaseConfig = {
    apiKey: "AIzaSyDjbTWTDdhfOp6MUBOC5R9hV8_Lj1RNSes",
    authDomain: "ciblessmp.firebaseapp.com",
    projectId: "ciblessmp",
    storageBucket: "ciblessmp.firebasestorage.app",
    messagingSenderId: "847287753501",
    appId: "1:847287753501:web:0202db036f9c935a751ff4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const viewCounterDB = doc(db, "counters", "viewCounter");
export const adViewsDB = doc(db, "adData", "adViews")