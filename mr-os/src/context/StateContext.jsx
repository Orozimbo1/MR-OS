import { createContext, useContext, useState } from "react";

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const arrayDevices = []

  const reset = () => {
    setShowMenu(false)
    setShowNavMenu(false)
  }

  return (
    <Context.Provider value={{
      showMenu, 
      setShowMenu,
      showNavMenu, 
      setShowNavMenu,
      reset,
      arrayDevices
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)