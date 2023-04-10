import './SideMenu.css'
import { useRef } from 'react'

import { Link } from 'react-router-dom'

// Context
import { useStateContext } from '../../context/StateContext'

const SideMenu = ({ array, direction }) => {
  const { setShowMenu } = useStateContext()
  const elementref = useRef()

  return (
    <div>
      <div className='blackout' onClick={() => setShowMenu(false)}></div>
      <div className={`side-menu ${direction}`}>
        {array && array.map((item, i) => (
          <ul key={i}>
            <li>
              <Link to={item.path}>
                {item.name}
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default SideMenu