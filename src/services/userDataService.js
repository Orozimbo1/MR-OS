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
    return newDocument
  } catch (error) {
    console.log(error)
  }
}

// Get an user data by userId
const getUserData = async (uid) => {
  const userDataRef = collection(db, 'userData')

  let q;
  let documents = []

  try {
    q = query(userDataRef, where('userId', '==', uid)) 
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      documents.push({ id: doc.id, ...doc.data() })
    });
    return documents[0]
    
  } catch (error) {
    console.log(error)
  }
}

// Get an user data by Id
const getUserDataId = async (id) => {
  try {
    const docRef = await doc(db, 'userData', id)
    const docSnap = await getDoc(docRef)

    return docSnap.data()
  } catch (error) {
    console.log(error)
  }
}

// Update an user data
const updateUserData = async (id, document) => {
  try {
    const docRef = await doc(db, 'userData', id)

    await updateDoc(docRef, { address: document.address, CNPJ: document.CNPJ })

    const updatedDocument = await getUserDataId(id)

    return updatedDocument
  } catch (error) {

    console.log(error.message)
  }
}

const userData = {
  registerUserData,
  getUserData,
  getUserDataId,
  updateUserData
}

export default userData;