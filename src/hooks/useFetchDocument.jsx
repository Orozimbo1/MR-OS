import { useState, useEffect } from "react"

// firebase
import { db } from "../firebase/config"
import { collection, query, where, getDocs } from 'firebase/firestore'

const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {

    async function loadDocument() {
      if(cancelled) return

      setLoading(true)

      try {

        // const docRef = doc(db, docCollection, 'L1zvioz4LJbKGfc5Pe3JxaPJqdy1')
        // const docSnap = await getDoc(docRef)

        const q = query(collection(db, docCollection), where("userId", "==", id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          console.log(doc.data())
          setDocument({id: doc.id, ...doc.data()})
        });
        setLoading(false)

      } catch (error) {

        console.log(error)
        setError(error.message)
        setLoading(false)

      }
      
    }

  loadDocument()
  }, [docCollection, id])

  return { document, loading, error }

}

export default useFetchDocument