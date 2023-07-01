import { createContext, useContext, useState } from "react";

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showModalDevice, setShowModalDevice] = useState(false)

  let arrayDevices = []

  return (
    <Context.Provider value={{
      showMenu, 
      setShowMenu,
      showModalDevice,
      setShowModalDevice,
      arrayDevices
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)