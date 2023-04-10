import './Dashboard.css'

import { Routes, Route, Link, Outlet } from 'react-router-dom'

// Pages
import { Home, Login } from '../index'

// Components
import { SideMenu } from '../../components'

const array = [
  {name: 'Minhas Ordens', path: '/dashboard'},
  {name: 'Faturamento', path: '/dashboard/serv'}
]

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <SideMenu array={array} direction={'left'} />
      <div className='pages'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
