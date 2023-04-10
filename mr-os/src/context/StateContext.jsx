import { createContext, useContext, useState } from "react";

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <Context.Provider value={{
      showMenu, 
      setShowMenu
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)