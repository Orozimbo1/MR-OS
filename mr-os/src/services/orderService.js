import { db } from "../firebase/config";
import { collection, addDoc, Timestamp, getDocs, onSnapshot, query, where, orderBy } from "firebase/firestore";

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

// Get all service orders
const getAllServiceOrders = async (uid) => {
  const servicesOrdersRef = collection(db, 'serviceOrders')

  let q;
  let documents = []

  try {
    q = query(servicesOrdersRef, where('userId', '==', uid), orderBy('createdAt', 'desc')) 
    
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

const orderService = {
  newOrder,
  getAllServiceOrders
}

export default orderService;