import './Dashboard.css'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { orders } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)

  const ordersPending = orders && orders.filter((order) => order.status.status === 'pending')
  const ordersFinished = orders && orders.filter((order) => order.status.status === 'finished')
  const ordersRejected = orders && orders.filter((order) => order.status.status === 'rejected')

  // const totalPending = orders && orders
  console.log(ordersFinished)

  return (
    <div className='dashboard'>
      <main className='dash'>
        <section className='topics'>
          <h2>Dashboard</h2>
          <div className='dash-data'>
            <div className='dash-card'>
              <h4>Em andamento</h4>
              <p>10</p>
            </div>
            <div className='dash-card'>
              <h4>Rejeitadas</h4>
              <p>20</p>
            </div>
            <div className='dash-card'>
              <h4>Concluídas</h4>
              <p>30</p>
            </div>
          </div>
        </section>
        <section className='topics'>
          <h2>Finanças</h2>
          <div className="dash-data">
            <div className='dash-card'>
              <h4>Total</h4>
              <p>R$:200</p>
            </div>
            <div className='dash-card'>
              <h4>Gastos</h4>
              <p>R$:50</p>
            </div>
            <div className='dash-card'>
              <h4>Lucro</h4>
              <p>R$:150</p>
            </div>
          </div>
        </section>
      </main>
      <aside className='dash-graphic'>
        <div className='graphic'>
          <p></p>
        </div>
        <div className='graphic'>
          <p></p>
        </div>
      </aside>
    </div>
  )
}

export default Dashboard
