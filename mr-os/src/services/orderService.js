import { db } from "../firebase/config";
import { collection, addDoc, Timestamp, getDocs, getDoc, query, where, orderBy, doc, updateDoc } from "firebase/firestore";

// Register a new service order
const newOrder = async (document) => {

  try {

    const newDocument = { ...document, createdAt: Timestamp.now() }
    const addDocument = await addDoc(
      collection(db, 'serviceOrders'),
      newDocument
    )

    return newDocument
  } catch (error) {
    console.log(error)
  }

}

// Get a service order

const getServiceOrder = async (id) => {
  try {
    const docRef = await doc(db, 'serviceOrders', id)
    const docSnap = await getDoc(docRef)

    return docSnap.data()
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

// Update the order status 
const updateOrderStatus = async (id, status) => {
  try {
    const docRef = await doc(db, 'serviceOrders', id)

    await updateDoc(docRef, {'status': status})

    const updatedDocument = await getServiceOrder(id)

    return updatedDocument
  } catch (error) {

    console.log(error)
  }
}

const orderService = {
  newOrder,
  getAllServiceOrders,
  getServiceOrder,
  updateOrderStatus
}

export default orderService;