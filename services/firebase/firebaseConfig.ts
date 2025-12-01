import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCGW1axUh1FG9o1rh1hOKTxSCV8h4H9Fgc",
  authDomain: "eco-cultiva.firebaseapp.com",
  projectId: "eco-cultiva",
  storageBucket: "eco-cultiva.firebasestorage.app",
  messagingSenderId: "384186008432",
  appId: "1:384186008432:web:0247a7eeaec77ee62f85b5",
  measurementId: "G-3E284KVR85"
};
// 🔹 Usuario temporal mientras no usamos Firebase Auth
export function getCurrentUserId(): string {
  return "demo-user";  
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

