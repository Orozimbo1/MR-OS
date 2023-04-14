import './Dashboard.css'

import { Outlet } from 'react-router-dom'

// Icons
import { RxHamburgerMenu } from 'react-icons/rx'
import { BsCashStack } from 'react-icons/bs'
import { MdListAlt } from 'react-icons/md'

// Components
import { SideMenu } from '../../components'

// Context
import { useStateContext } from '../../context/StateContext'

const array = [
  {name:'Minhas ordens', path: '/dashboard'},
  {name: 'Finanças', path: '/dashboard/financial'}
]

const Dashboard = () => {
  const { showMenu, setShowMenu } = useStateContext(true)

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
