import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInAnonymously,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

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

// Sign in anonymously
export const signInUserAnonymously = () => signInAnonymously(auth);

// Sign out the current user
export const logOut = () => signOut(auth);

const database = getFirestore(app);
export const userDataCollection = collection(database, "userData");

// Add cart and wishlist data to firebase database
export const addCartToFirebase = async (id, cart, wishlist) => {
  const currentUserDocument = doc(database, "userData", `${id}`);

  //set doc with cart and wishlist data and merge with existing data
  await setDoc(
    currentUserDocument,
    { id, cart: [...cart], wishlist: [...wishlist] },
    { merge: true }
  );
};

// Delete user, cart and wishlist data from firebase database
export const deleteUserData = async (userID) => {
  try {
    const currentUserDocument = doc(database, "userData", `${userID}`);
    const user = auth.currentUser;
    await deleteDoc(currentUserDocument);
    await deleteUser(user);
  } catch (error) {
    alert(error.message);
  }
};
