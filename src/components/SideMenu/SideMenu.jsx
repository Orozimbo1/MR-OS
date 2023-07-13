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
          <button className={styles.right} onClick={() => setShowMenu(false)}>Voltar</button>
        </div>  
        <ul >
        {array && array.map((item, i) => (
          <Link key={i} className={styles.link} to={item.path}>
            <li onClick={() => setShowMenu(false)}>
                {item.name}
            </li>
          </Link>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default SideMenu