import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Register a new service order
const newOrder = async (document) => {

  try {
    
    const newDocument = { ...document, createdAt: Timestamp.now() }
    const addDocument = await addDoc(
      collection(db, 'serviceOrders'),
      newDocument
    )
    console.log(addDocument)

    return newDocument
  } catch (error) {
    console.log(error)
  }

}

const orderService = {
  newOrder,
}

export default orderService;