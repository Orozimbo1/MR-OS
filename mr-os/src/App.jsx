// Router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

// Pages
import { Home, ServiceOrder, Dashboard } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/service-order' element={<ServiceOrder />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
