// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

// Components
import { Navbar, Footer, SideBar, SideMenu } from './components'

// Pages
import { Home, ServiceOrder, Dashboard, Login, Register, OrderDetails } from './pages'

// Hooks
import { useAuth } from './hooks'

// Context
import { useStateContext } from './context/StateContext'

function App() {
  const { auth, loading } = useAuth()

  const { showMenu } = useStateContext()

  if(loading) {
    return <p>Carregando ...</p>
  }

  const array = [
    {name: 'Dashboard', path: '/dashboard'},
    {name: 'Nova ordem de serviço', path: '/order-service'},
  ]

  return (
    <BrowserRouter>
        {auth && <SideBar />}
        {auth && <Navbar />}
        {showMenu && <SideMenu array={array} /> }
        <div className="container">
          <Routes>
            <Route path='/' element={auth ? <Home /> : <Navigate to='/login' />} /> 
            <Route path='/order-service' element={auth ? <ServiceOrder /> : <Navigate to='/login' />} /> 
            <Route path='/order-service/:id' element={auth ? <OrderDetails /> : <Navigate to='/login' />} /> 
            <Route path='/login' element={!auth ? <Login /> : <Navigate to='/' />} /> 
            <Route path='/register' element={!auth ? <Register /> : <Navigate to='/' />} /> 
            <Route path='/dashboard' element={auth ? <Dashboard /> : <Navigate to='/login' />} />
          </Routes>
        </div>
        {auth && <Footer />}
    </BrowserRouter>
  )
}

export default App
