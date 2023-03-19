import './Navbar.css'

// Components
import { Link, NavLink } from 'react-router-dom'

// Hooks
import { useAuth } from '../../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Icons
import { AiOutlineDashboard } from 'react-icons/ai'
import { BsHouse, BsPerson } from 'react-icons/bs'
import { BiTask } from 'react-icons/bi'

// Redux
import { logout, reset } from '../../slices/authSlice'

const Navbar = () => {
  const { auth } = useAuth()

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
        <span>MR Os</span>
      </Link>
      <ul id='nav-links'>
        <li>
          <NavLink to='/'>
            <BsHouse />
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>
            <AiOutlineDashboard />
          </NavLink>
        </li>
        <li>
          <NavLink to='/order-service'>
            <BiTask />
          </NavLink>
        </li>
        {!auth && (
          <li>
            <NavLink to='/login'>
              <BsPerson />
            </NavLink>
          </li>
        )}
        {auth && (
          <li>
            <span onClick={handleLogout}>Sair</span>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar