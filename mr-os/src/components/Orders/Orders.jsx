import './Orders.css'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { getAllServiceOrders } from '../../slices/orderSlice'

// Components
import { CardOrderService } from '../../components'

const Orders = () => {
  const { orders, loading } = useSelector((state) => state.order)
  const { user: { uid } } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllServiceOrders(uid))
  }, [uid])

  return (
    <div className='container'>
      {loading && <p>Carregando...</p>}
      <h2>Histórico de ordens:</h2>
      {orders && orders.map((order) => (
        <CardOrderService 
          key={order.id} 
          name={order.name}  
          address={order.address} 
          phoneNumber={order.phoneNumber} 
          createdAt={order.createdAt}
          id={order.id}
        />
      ))}
    </div>
  )
}

export default Orders