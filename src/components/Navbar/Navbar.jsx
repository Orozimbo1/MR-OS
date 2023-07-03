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
    <header className={styles.nav}>
      <div className={styles.hamburger}>
        <RxHamburgerMenu onClick={() => setShowMenu(true)} />
      </div>
      <nav>
        <Link to='/'>
          {user && <h1 className={styles.logo}>{user.displayName}</h1>}
        </Link>
        <span onClick={handleLogout}>Sair</span>
      </nav>
    </header>
  )
}

export default Navbar