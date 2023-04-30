import './Dashboard.css'

import { Link } from 'react-router-dom'

const Dashboard = () => {

  return (
    <div className='dashboard'>
      <div id='dash'>
        <h1>Dashboard</h1>
        <Link to='#finances'>finanças</Link>
      </div>
      <div id='finances'>
        <h1>Finanças</h1>
      </div>
    </div>
  )
}

export default Dashboard
