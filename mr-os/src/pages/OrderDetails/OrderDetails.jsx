import './OrderDetails.css'

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

  useEffect(() => {
    dispatch(getServiceOrder(id))
  },[id])

  const date = order.createdAt && order.createdAt.toDate() && order.createdAt.toDate().toLocaleString('pt-BR', { timezone: 'UTC' })
  
  {loading && <p>Carregando...</p>}

  return (
    <div className='container'>
      {order && (
        <div>
          <h2>Nome: {order.name}</h2>
          <h3>Endereço: {order.address}</h3>
          <h3>Telefone: {order.phoneNumber}</h3>
          <h3>Data de criação: {date}</h3>
          <h3>Dispositivos:</h3>
          {order.devices.map((device,i) => (
            <div key={i}>
              <br />
              <h3>{device.deviceType}</h3>
              <p>{device.brand}</p>
              <p>{device.model}</p>
              <p>{device.color}</p>
              <p>{device.problemDesc}</p>
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