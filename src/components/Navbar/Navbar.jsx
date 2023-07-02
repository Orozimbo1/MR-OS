import styles from './Navbar.module.css'

// Components
import { Link} from 'react-router-dom'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Icons
import { FiLogOut } from 'react-icons/fi'
import { RxHamburgerMenu } from 'react-icons/rx'

// Redux
import { logout, reset } from '../../slices/authSlice'

// Context
import { useStateContext } from '../../context/StateContext'

// Miscelaneous
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";


const Navbar = () => {

  const { user } = useSelector((state) => state.auth)

  const { setShowMenu } = useStateContext()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  return (
   
    <nav id={styles.nav}>
      <RxHamburgerMenu className={styles.hamburger} onClick={() => setShowMenu(true)} />
      <Link to='/'>
        {user && <span id={styles.logo}>{user.displayName}</span>}
      </Link>
      <ul id={styles.nav_links}>
        {user && (
          <li>
            <span id='Sair' onClick={handleLogout}><FiLogOut /></span>
          </li>)}
        <ReactTooltip
          anchorId="Sair"
          place="bottom"
          content="Sair" />
      </ul>
    </nav>
  )
}

export default Navbar