import { db } from "../firebase/config";
import { collection, addDoc, Timestamp, getDocs, getDoc, query, where, orderBy, doc, updateDoc } from "firebase/firestore";

// Register an user data
const registerUserData = async (document) => {

  try {
 
    const newDocument = { ...document }
    const addDocument = await addDoc(
      collection(db, 'userData'),
      newDocument
    )
    console.log(newDocument)
    console.log(addDocument)
    return newDocument
  } catch (error) {
    console.log(error)
  }
}

// Get an user data
const getUserData = async (uid) => {
  const userDataRef = collection(db, 'userDatauserData')

  let q;
  let documents = []

  try {
    q = query(userDataRef, where('userId', '==', uid)) 
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      documents.push({ id: doc.id, ...doc.data() })
    });
    return documents
    
  } catch (error) {
    console.log(error)
  }
}

const userData = {
  registerUserData,
  getUserData
}

export default userData;