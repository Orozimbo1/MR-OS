// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

// Components
import { Navbar, Footer } from './components'

// Pages
import { Home, ServiceOrder, Dashboard, Login, Register } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/order-service' element={<ServiceOrder />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
