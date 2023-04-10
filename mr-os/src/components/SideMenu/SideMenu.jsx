import './SideMenu.css'
import React from 'react'

import { Link } from 'react-router-dom'

const SideMenu = ({ array, direction }) => {
  return (
    <div>
      <div className='blackout'></div>
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