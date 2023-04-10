import './Dashboard.css'

import { Outlet } from 'react-router-dom'

// Icons
import { RxHamburgerMenu } from 'react-icons/rx'

// Components
import { SideMenu } from '../../components'

// Context
import { useStateContext } from '../../context/StateContext'

const array = [
  {name: 'Minhas Ordens', path: '/dashboard'},
  {name: 'Financeiro', path: '/dashboard/financial'}
]

const Dashboard = () => {
  const { showMenu, setShowMenu } = useStateContext()

  return (
    <div className='dashboard'>
      <div className='topics'>
        <RxHamburgerMenu onClick={() => setShowMenu(true)}/>
      </div>
      {showMenu && <SideMenu array={array} direction={'left'} />}
      <div className='pages'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
