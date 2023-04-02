// import { app } from '../firebase/config'

import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// const auth = getAuth(app)

// Register a new service order
const newOrder = async (document) => {

  try {
    
    const newDocument = { ...document, createdAt: Timestamp.now() }

    const addDocument = await addDoc(
      collection(db, 'serviceOrder'),
      newDocument
    )

    return addDocument
  } catch (error) {
    console.log(error)
  }

}

const orderService = {
  newOrder,
}

export default orderService;