import styles from './SideBar.module.css'

// Icons
import { BsStar } from 'react-icons/bs'
import { AiOutlineDashboard } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import { MdOutlineContactSupport } from 'react-icons/md'
import { BsCashStack } from 'react-icons/bs'
import { BsCardChecklist } from 'react-icons/bs'

// Context
import { useStateContext } from '../../context/StateContext'

const SideBar = () => {
  const { showMenu, setShowMenu } = useStateContext()

  return (
    <div className={styles.side_bar} onMouseEnter={() => setShowMenu(true)}>
      <div className={styles.logo}>
        <BsStar />
      </div>
      <ul>
        <li><BsCardChecklist size={30} /></li>
        <li><AiOutlineDashboard size={30} /></li>
        <li><AiOutlineSetting size={30}/></li>
        <li><MdOutlineContactSupport size={30}/></li>
        <li><AiFillGithub size={30}/></li>
      </ul>
    </div>
  )
}

export default SideBar