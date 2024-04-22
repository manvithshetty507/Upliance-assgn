// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBblQ6jen2_ml7z8LxIThflDnOrBLTBdc0",
  authDomain: "upliance-assgn-e8b79.firebaseapp.com",
  projectId: "upliance-assgn-e8b79",
  storageBucket: "upliance-assgn-e8b79.appspot.com",
  messagingSenderId: "1022323093083",
  appId: "1:1022323093083:web:a1dac130a5492c78dc597e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }; // Exporting auth and db for usage in other files


