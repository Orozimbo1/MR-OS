import './Navbar.css'

// Components
import { Link} from 'react-router-dom'

// Hooks
import { useAuth } from '../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Icons
import { RxHamburgerMenu } from 'react-icons/rx'

// Redux
import { logout, reset } from '../../slices/authSlice'

// Context
import { useStateContext } from '../../context/StateContext'
import SideMenu from '../SideMenu/SideMenu'

const Navbar = () => {
  const { showNavMenu, setShowNavMenu } = useStateContext()

  const { auth } = useAuth()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  const array = [
    {name: 'Dashboard', path: '/dashboard'},
    {name: 'Nova ordem de serviço', path: '/order-service'},
  ]

  return (
    <nav id='nav'>
      <Link to='/'>
        <span>MR Os</span>
      </Link>
      <ul id='nav-links'>
        {auth && (
          <li>
            <span onClick={handleLogout}>Sair</span>
          </li>
        )}
        {showNavMenu && <SideMenu array={array} direction={'rigth'} /> }
        <li onClick={() => setShowNavMenu(true)}>
          <RxHamburgerMenu />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar