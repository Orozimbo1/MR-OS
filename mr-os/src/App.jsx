// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

// Components
import { Navbar, Footer, SideMenu } from './components'

// Pages
import { Home, ServiceOrder, Dashboard, Login, Register, OrderDetails } from './pages'

// Hooks
import { useAuth } from './hooks'

function App() {
  const { auth, loading } = useAuth()

  if(loading) {
    return <p>Carregando ...</p>
  }

  return (
    <BrowserRouter>
      <Navbar />
      {/* <SideMenu /> */}
      <div className="container">
        <Routes>
          <Route path='/' element={auth ? <Home /> : <Navigate to='/login' />} /> 
          <Route path='/dashboard' element={auth ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/order-service' element={auth ? <ServiceOrder /> : <Navigate to='/login' />} /> 
          <Route path='/order-service/:id' element={auth ? <OrderDetails /> : <Navigate to='/login' />} /> 
          <Route path='/login' element={!auth ? <Login /> : <Navigate to='/' />} /> 
          <Route path='/register' element={!auth ? <Register /> : <Navigate to='/' />} /> 
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
