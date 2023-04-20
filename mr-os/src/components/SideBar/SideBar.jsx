import './SideBar.css'

// Icons
import { BsStar } from 'react-icons/bs'
import { AiOutlineDashboard } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import { MdOutlineContactSupport } from 'react-icons/md'
import { BsCashStack } from 'react-icons/bs'
import { BsCardChecklist } from 'react-icons/bs'

// Context
import { useStateContext } from '../../context/StateContext'

// Components
import SideMenu from '../SideMenu/SideMenu'


const SideBar = () => {
  const { showNavMenu, setShowNavMenu } = useStateContext()

  const array = [
    {name: 'Dashboard', path: '/dashboard'},
    {name: 'Nova ordem de serviço', path: '/order-service'},
  ]

  return (
    <div className='side-bar' onMouseEnter={() => setShowNavMenu(true)}>
      {showNavMenu && <SideMenu array={array} /> }
      <div className="logo">
        <BsStar />
      </div>
      <ul>
        <li><AiOutlineDashboard size={30} /></li>
        <li><BsCashStack size={30} /></li>
        <li><BsCardChecklist size={30} /></li>
        <li><AiOutlineSetting size={30}/></li>
        <li><MdOutlineContactSupport size={30}/></li>
        <li><AiFillGithub size={30}/></li>
      </ul>
    </div>
  )
}

export default SideBar