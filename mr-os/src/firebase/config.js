import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD9-ljH3eVvy8CfoiswepT1DYSR6b3bCyQ",
  authDomain: "mr-os-940b3.firebaseapp.com",
  projectId: "mr-os-940b3",
  storageBucket: "mr-os-940b3.appspot.com",
  messagingSenderId: "527364761499",
  appId: "1:527364761499:web:3a847257b0a9202e30233e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db, app }