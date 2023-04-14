import './OrderDetails.css'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

// Redux
import { getServiceOrder } from '../../slices/orderSlice'
import { DeviceData } from '../../components'

const Order = () => {
  const { order, loading } = useSelector((state) => state.order)

  const dispatch = useDispatch()

  const { id } = useParams()
  
  let status
  
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
          <div className='status-container'>Status: 
            <div className={`status ${order.status.status}`}></div> 
            {order.status.text}
          </div>
          <h3>Dispositivos:</h3>
          {order.devices && order.devices.map((device,i) => (
            <div key={i}>
              <DeviceData 
                showActions={false}
                device={device} 
              />
            </div>
          ))}
          <Link>Gerar PDF</Link>
        </div>
      )}
    </div>
  )
}

export default Order