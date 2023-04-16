// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

// Components
import { Navbar, Footer, SideBar } from './components'

// Pages
import { Home, ServiceOrder, Dashboard, Login, Register, OrderDetails } from './pages'

// Hooks
import { useAuth } from './hooks'

// Context
import { StateContext } from './context/StateContext'

function App() {
  const { auth, loading } = useAuth()

  if(loading) {
    return <p>Carregando ...</p>
  }

  const arrayInfo = [
    {status: 'pending', title: 'Em andamento'},
    {status: 'finished', title: 'Concluídas'},
    {status: 'rejected', title: 'Rejeitadas'}
  ]

  return (
    <BrowserRouter>
      <StateContext>
        {auth && <SideBar />}
        {auth && <Navbar />}
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
      </StateContext>
    </BrowserRouter>
  )
}

export default App
