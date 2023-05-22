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


const userData = {
  registerUserData
}

export default userData;