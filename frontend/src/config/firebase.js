import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCnDWcFeSFSKn5BsrVwdIEqPjxihO5tY7w",
  authDomain: "gideon-db8ab.firebaseapp.com",
  projectId: "gideon-db8ab",
  storageBucket: "gideon-db8ab.firebasestorage.app",
  messagingSenderId: "114667605820",
  appId: "1:114667605820:web:772f48d0ae1025c9615839",
  measurementId: "G-XDFW4N7TSZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();