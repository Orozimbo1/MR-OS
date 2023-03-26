import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCMKfPEPz5NT1Gu40g6csIpp23lDEYBvS8",
  authDomain: "mr-os-3b581.firebaseapp.com",
  projectId: "mr-os-3b581",
  storageBucket: "mr-os-3b581.appspot.com",
  messagingSenderId: "883027341023",
  appId: "1:883027341023:web:dd064733b051b67471036a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db, app }