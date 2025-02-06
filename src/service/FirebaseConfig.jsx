// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,
  authDomain: "my-project-1-59e37.firebaseapp.com",
  projectId: "my-project-1-59e37",
  storageBucket: "my-project-1-59e37.firebasestorage.app",
  messagingSenderId: "923249910510",
  appId: "1:923249910510:web:c6b65c2fd9748a1f7ec9ff",
  measurementId: "G-GBQJYVQCXC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
