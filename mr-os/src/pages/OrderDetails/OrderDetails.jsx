import './OrderDetails.css'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

// Redux
import { getServiceOrder, updateOrderStatus } from '../../slices/orderSlice'
import { DeviceData } from '../../components'

const Order = () => {
  const { order, loading } = useSelector((state) => state.order)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  
  useEffect(() => {
    dispatch(getServiceOrder(id))
  },[id, dispatch])

  const date = order && order.createdAt && order.createdAt.toDate() && order.createdAt.toDate().toLocaleString('pt-BR', { timezone: 'UTC' })
  
  {loading && <p>Carregando...</p>}

  const handleUpdateStatusOrder = (status, text) => {
    dispatch(updateOrderStatus({id, status: {status: status, text: text}}))

    navigate('/')
  }

  return (
    <div>
      {order && order.status && (
        <div className='container'>
          <h2>Nome: {order.name}</h2>
          <h3>Endereço: {order.address}</h3>
          <h3>Telefone: {order.phoneNumber}</h3>
          <h3>Data de criação: {date}</h3>
          <div className='status-container'>Status: 
            <div className={`status ${order.status && order.status.status}`}></div> 
            {order.status && order.status.text}
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
          {order.status.status !== 'pending' && (
            <div className='finish-or-cancel'>
              <button 
                className='cancel-btn' 
                onClick={() => handleUpdateStatusOrder('rejected', 'Rejeitada')}>
                  Cancelar
              </button>
              <button 
                className='btn' 
                onClick={() => handleUpdateStatusOrder('finished', 'Concluída')}>
                  Finalizar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Order