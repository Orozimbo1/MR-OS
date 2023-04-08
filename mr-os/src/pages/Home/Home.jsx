import './Home.css'

// Hooks
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { getAllServiceOrders } from '../../slices/orderSlice'

const Home = () => {
  const { orders, loading, error } = useSelector((state) => state.order)
  const { user: { uid } } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllServiceOrders(uid))
  }, [uid])

  return (
    <div>
      {orders && orders.map((order) => (
        <div key={order.id}>
          <br />
          <p>Nome: {order.name}</p>
          <p>Endereço: {order.address}</p>
          {/* <p>Criado em: {order.createdAt}</p> */}
          <p>Criado por: {order.createdBy}</p>
          <p>Telefone: {order.phoneNumber}</p>
          <p>Id do usuário: {order.userId}</p>
          <br />
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Home