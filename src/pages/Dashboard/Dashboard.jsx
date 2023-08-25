import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { ChartDash, ChartOrder } from '../../components'

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
    <div className={styles.dashboard}>
      <section className={styles.dash}>
        <ul className={styles.dash_data}>
          <li>
            <p>Ordens:</p>
            <span>780</span>
          </li>
          <li>
            <p>Gastos:</p>
            <span>R$: 1.300</span>
          </li>
          <li>
            <p>Lucro:</p>
            <span>R$: 8.700</span>
          </li>
          <li>
            <p>Total:</p>
            <span>R$: 10.000</span>
          </li>
        </ul>
        <ChartOrder />
      </section>
      <h2>Finanças</h2>
      <ChartDash />
    </div>
  )
}

export default Dashboard
