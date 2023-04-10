import './Dashboard.css'

import { Routes, Route, Link, Outlet } from 'react-router-dom'

// Pages
import { Home, Login } from '../index'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      {/* Isso vai ser um comoponente */}
       <div className='menu'>
        <ul>
          <li>
            <Link to='/'>
              Ordens de Serviço
            </Link>
          </li>
          <li>
            <Link to='/'>
              Faturamento
            </Link>
          </li>
          <li>
            <Link to='/'>
              O que você quiser
            </Link>
          </li>
          <li>
            <Link to='/'>
              Outra coisa que voce quiser
            </Link>
          </li>
        </ul>
       </div>
       <div className='pages'>
        <Routes>
          {/* Subistituir por outras rotas são só demonstrativas */}
          <Route path='/' element={<Home />} /> 
        </Routes>
        <Outlet />
       </div>
    </div>
  )
}

export default Dashboard
