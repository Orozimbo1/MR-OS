import styles from './Orders.module.css'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { getAllServiceOrders } from '../../slices/orderSlice'

// Components
import { CardOrderService } from '../../components'

const Orders = ({ status, title }) => {
  const { orders, loading } = useSelector((state) => state.order)
  const { user: { uid } } = useSelector((state) => state.auth)

  const dispatch = useDispatch()  

  useEffect(() => {
    dispatch(getAllServiceOrders(uid))
  }, [uid])

  const ordersFilter = orders && orders.filter((order) => order.status.status === status)

  loading && <p>Carregando...</p>
  return (
    <>
      <div className='container'>
        <h2>{title}:</h2>
        <div className={styles.order_service_cards}>
            {ordersFilter && ordersFilter.map((order) => (
              <CardOrderService 
                key={order.id} 
                name={order.name}  
                address={order.address} 
                phoneNumber={order.phoneNumber} 
                createdAt={order.createdAt}
                finishedAt={order.finishedAt}
                devices={order.devices}
                status={order.status.status}
                total={order.total}
                id={order.id}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Orders