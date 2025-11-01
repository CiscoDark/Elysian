import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration, provided by you.
const firebaseConfig = {
  apiKey: "AIzaSyA0GUOeDYBoXTR-SNwAzAiQMl-PvFAzS6A",
  authDomain: "medical-glossary.firebaseapp.com",
  projectId: "medical-glossary",
  storageBucket: "medical-glossary.firebasestorage.app",
  messagingSenderId: "1096826551407",
  appId: "1:1096826551407:web:f46f242ba3579cc98a619a",
  measurementId: "G-GX2STF3MLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services that will be used in the application
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
