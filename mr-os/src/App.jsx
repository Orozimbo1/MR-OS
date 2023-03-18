// Router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

// Components
import { Navbar } from './components'

// Pages
import { Home, ServiceOrder, Dashboard } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/order-service' element={<ServiceOrder />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
