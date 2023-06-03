import './Dashboard.css'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { orders } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)

  const ordersPending = orders && orders.filter((order) => order.status.status === 'pending')
  const ordersFinished = orders && orders.filter((order) => order.status.status === 'finished')
  const ordersRejected = orders && orders.filter((order) => order.status.status === 'rejected')

  // Valor de ordens em andamento
  const totalPending = ordersPending.reduce((acc, val) => acc + val.total, 0)
  const totalPartsPending = ordersPending.reduce((acc, val) => acc + val.devices.reduce((acc, val) => acc + val.totalParts, 0), 0)
  const totalLaborPending = ordersPending.reduce((acc, val) => acc + val.devices.reduce((acc, val) => acc + parseInt(val.labor), 0), 0)

  // Valor de ordens Concluídas
  const totalFinished = ordersFinished.reduce((acc, val) => acc + val.total, 0)
  const totalPartsFinished = ordersFinished.reduce((acc, val) => acc + val.devices.reduce((acc, val) => acc + val.totalParts, 0), 0)
  const totalLaborFinished = ordersFinished.reduce((acc, val) => acc + val.devices.reduce((acc, val) => acc + parseInt(val.labor), 0), 0)

  // Valor de ordens rejeitadas
  const totalRejected = ordersRejected.reduce((acc, val) => acc + val.total, 0)
  const totalPartsRejected = ordersRejected.reduce((acc, val) => acc + val.devices.reduce((acc, val) => acc + val.totalParts, 0), 0)
  const totalLaborRejected = ordersRejected.reduce((acc, val) => acc + val.devices.reduce((acc, val) => acc + parseInt(val.labor), 0), 0)

  return (
    <div className='dashboard'>
      <main className='dash'>
        <section className='topics'>
          <h2>Dashboard</h2>
          <div className='dash-data'>
            <div className='dash-card'>
              <h4>Em andamento</h4>
              <p>{ordersPending.length}</p>
            </div>
            <div className='dash-card'>
              <h4>Rejeitadas</h4>
              <p>{ordersRejected.length}</p>
            </div>
            <div className='dash-card'>
              <h4>Concluídas</h4>
              <p>{ordersFinished.length}</p>
            </div>
          </div>
        </section>
        <section className='topics'>
          <h2>Finanças</h2>
          <div className="dash-data">
            <div className='dash-card'>
              <h4>Total</h4> 
              <p>R$: {totalFinished}</p>                         
              <p>{ordersFinished.length > 0 ? 100 : 0}%</p>                         
            </div>
            <div className='dash-card'>
              <h4>Gastos</h4>
              <p>R$: {totalPartsFinished}</p>
              <p>{ordersFinished.length > 0 ? ((totalPartsFinished * 100) / totalFinished).toFixed(1): 0}%</p>
            </div>
            <div className='dash-card'>
              <h4>Lucro</h4>
              <p>R$: {totalLaborFinished}</p>
              <p>{ordersFinished.length > 0 ? ((totalLaborFinished * 100) / totalFinished).toFixed(1) : 0}%</p>
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
