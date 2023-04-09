import './Order.css'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

// Redux
import { getServiceOrder } from '../../slices/orderSlice'

const Order = () => {
  const { order, loading } = useSelector((state) => state.order)

  const dispatch = useDispatch()

  const { id } = useParams()
  // console.log(id)

  useEffect(() => {
    dispatch(getServiceOrder(id))
  }, [id])

  const date = order.createdAt.toDate().toDateString()
  const devices = ['celular', 'tv', 'computador']

  return (
    <div>
      {order && (
        <div>
          <h2>Nome: {order.name}</h2>
          <h3>Endereço: {order.address}</h3>
          <h3>Telefone: {order.phoneNumber}</h3>
          <h3>Data de criação: {date}</h3>
          <h3>Dispositivos:</h3>
          {devices.map((device,i) => (
            <div key={i}>
              <br />
              <h1>{device}</h1>
              <hr />
            </div>
          ))}
          <Link>Gerar PDF</Link>
        </div>
      )}
    </div>
  )
}

export default Order