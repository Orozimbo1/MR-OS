import './Navbar.css'

// Components
import { Link} from 'react-router-dom'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Icons
import { FiLogOut} from 'react-icons/fi'

// Redux
import { logout, reset } from '../../slices/authSlice'

// Miscelaneous
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";


const Navbar = () => {

  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  return (
    
    <nav id='nav'>
      <Link to='/'>
        <span id='logo'>MR Os</span>
      </Link>
      <ul id='nav-links'>
        {user && (
          <li>
            <span id='Sair' onClick={handleLogout}><FiLogOut /></span>
          </li>)}
        <ReactTooltip
        anchorId="Sair"
        place="bottom"
        content="Sair"
        />
      </ul>
    </nav>
  )
}

export default Navbar