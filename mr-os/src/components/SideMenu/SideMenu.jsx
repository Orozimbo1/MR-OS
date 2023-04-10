import './SideMenu.css'

import { Link } from 'react-router-dom'

// Context
import { useStateContext } from '../../context/StateContext'

const SideMenu = ({ array, direction }) => {
  const { setShowNavMenu, setShowMenu, reset } = useStateContext()

  return (
    <div>
      <div className='blackout' onClick={() => reset()}></div>
      <div className={`side-menu ${direction}`}>
        <div className='back'>
          <span className={direction === 'rigth' ? 'left' : 'rigth'}>Voltar</span>
        </div>  
        <ul >
        {array && array.map((item, i) => (
          <li key={i} onClick={() => reset()}>
            <Link to={item.path}>
              {item.name}
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default SideMenu