import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd6FDz9-aDS1UZX1mesxDqZzBJHga0dUA",
  authDomain: "fir-auth-60de5.firebaseapp.com",
  projectId: "fir-auth-60de5",
  storageBucket: "fir-auth-60de5.appspot.com",
  messagingSenderId: "388670450121",
  appId: "1:388670450121:web:80c2fb42dd9f95ef9ca018"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);