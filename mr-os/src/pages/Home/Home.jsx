import './Home.css'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { getAllServiceOrders } from '../../slices/orderSlice'

const Home = () => {
  const { orders, loading, error } = useSelector((state) => state.order)
  const { user: { uid } } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllServiceOrders(uid))
  }, [uid, dispatch])

  return (
    <div>
      {orders && orders.map((order) => <p key={order.id}>{order.name}</p>)}
      <p>ola</p>
    </div>
  )
}

export default Home