import './SideBar.css'

// Icons
import { BsStarFill } from 'react-icons/bs'

// Context
import { useStateContext } from '../../context/StateContext'

// Components
import SideMenu from '../SideMenu/SideMenu'


const SideBar = () => {
  const { showNavMenu } = useStateContext()

  const array = [
    {name: 'Dashboard', path: '/dashboard'},
    {name: 'Nova ordem de serviço', path: '/order-service'},
  ]

  return (
    <div className='side-bar'>
      {showNavMenu && <SideMenu array={array} /> }
      <div className="logo">
        <BsStarFill />
      </div>
      <ul>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
        <li>oi</li>
      </ul>
    </div>
  )
}

export default SideBar