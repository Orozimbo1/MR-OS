import './Navbar.css'

import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks'

import { AiOutlineDashboard } from 'react-icons/ai'
import { BsHouse, BsPerson } from 'react-icons/bs'
import { BiTask } from 'react-icons/bi'

const Navbar = () => {
  const { auth } = useAuth()

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
            <span>Sair</span>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar