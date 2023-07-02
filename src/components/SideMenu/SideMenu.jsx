import styles from './SideMenu.module.css'

import { Link } from 'react-router-dom'

// Context
import { useStateContext } from '../../context/StateContext'

const SideMenu = ({ array }) => {
  const { setShowMenu } = useStateContext()

  return (
    <div>
      <div className='blackout' onClick={() => setShowMenu(false)} onMouseEnter={() => setShowMenu(false)}></div>
      <div className={styles.side_menu}>
        <div className={styles.back}>
          <span className={styles.right} onClick={() => setShowMenu(false)}>Voltar</span>
        </div>  
        <ul >
        {array && array.map((item, i) => (
          <li key={i} onClick={() => setShowMenu(false)}>
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