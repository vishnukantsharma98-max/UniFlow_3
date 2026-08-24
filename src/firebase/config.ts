import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCscEB5sXpaf_5Tvng_lCHyt-q7lPS0pv8",
  authDomain: "uniflow-280b5.firebaseapp.com",
  projectId: "uniflow-280b5",
  storageBucket: "uniflow-280b5.firebasestorage.app",
  messagingSenderId: "438743052212",
  appId: "1:438743052212:web:e3e2d879a26ea76d494ce1"
};

// Initialize Firebase once
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
