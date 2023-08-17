import { useState, useEffect, useReducer } from "react"

import { updateDoc, doc } from 'firebase/firestore'

// firebase config
import { db } from '../firebase/config'

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (id, document) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      
      const docRef = doc(db, docCollection, id)

      await updateDoc(docRef, { corporateName: document.corporateName, address: document.address, CNPJ: document.CNPJ })
      // console.log(updatedDocument)

      // checkCancelBeforeDispatch({
      //   type: "UPDATE_DOC",
      //   payload: updatedDocument,
      // });
    } catch (error) {

      console.log(error.message)
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  // useEffect(() => {
  //   return () => setCancelled(true);
  // }, []);

  return { updateDocument, response };
};

export default useUpdateDocument