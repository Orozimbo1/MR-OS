import './Home.css'

// Components
import { Orders } from '../../components'

const Home = () => {
  return (
    <div className='container'>
      <Orders status={'pending'}/>
    </div>
  )
}

export default Home