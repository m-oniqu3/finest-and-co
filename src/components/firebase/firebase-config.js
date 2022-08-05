import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth service
export const auth = getAuth(app);

// Create a new user with an email and password
export const createAccount = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with an email and password
export const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//Sign in anonymously
export const signInUserAnonymously = () => signInAnonymously(auth);

// Sign out the current user
export const logOut = () => signOut(auth);
