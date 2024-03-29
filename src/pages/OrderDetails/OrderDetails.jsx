import styles from './OrderDetails.module.css'

// Firebase
import { Timestamp } from 'firebase/firestore'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useFetchDocument } from '../../hooks'

// Redux
import { getServiceOrder, updateOrderStatus } from '../../slices/orderSlice'
import { DeviceData } from '../../components'

// Context
import { useStateContext } from '../../context/StateContext'

// Component
import { Print } from '../../components'

const Order = () => {
  const { order, loading } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)
  const { document, loading: loadingData, error } = useFetchDocument('userData', user.uid)

  const { showPrint, setShowPrint } = useStateContext()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  
  useEffect(() => {
    dispatch(getServiceOrder(id))
  },[id, dispatch])


  const date = order && order.createdAt && order.createdAt.toDate() && order.createdAt.toDate().toLocaleString('pt-BR', { timezone: 'UTC' })
  const dateFinished = order && order.finishedAt && order.finishedAt.toDate() && order.finishedAt.toDate().toLocaleString('pt-BR', { timezone: 'UTC' })
  
  {loading && <p>Carregando...</p>}

  const handleUpdateStatusOrder = (status, text) => {
    dispatch(updateOrderStatus({id, finshed: {status: {status: status, text: text}, finishedAt: Timestamp.now()}}))

    navigate('/')
  }

  const printGenerate = () => {
    if(!document || !document.corporateName || !document.address) {
      alert('Voce precisa cadastrar seus dados na página de configurações.')
      return
    }
    setShowPrint(true)
  }

  return (
    <div>
      {order && order.status && (
        <div>
          {showPrint && 
            <Print 
              userData={document}
              user={user}
              order={order}
              id={id}
            />
          }
          <div className={styles.customer_data}>
            <h2>{order.name}</h2>
            <h3>Endereço: {order.address}</h3>
            <h3>Telefone: {order.phoneNumber}</h3>
            <h3>Data de criação: {date}</h3>
            {order.status.status !== 'pending' && <h3>Finalizou em: {dateFinished}</h3>}
          </div>
          <div className={styles.status_container}>Status: 
            <div className={`${styles.status} ${order.status && order.status.status}`}></div> 
            <p>{order.status && order.status.text}</p>
          </div>
          <div className={styles.devices}>
          <h4>Dispositivos:</h4>
            {order.devices && order.devices.map((device,i) => (
              <div key={i}>
                <DeviceData 
                  showActions={false}
                  device={device} 
                />
              </div>
            ))}
          </div>
          <div className='total'>
            <h4>Total</h4>
            <p><span>R$:</span> {order.total}</p>
          </div>
          <div className={styles.print}>
            {order.status.status != 'finished' && (
              <Link to={`/new-order/${id}`}>Editar ordem</Link>
            )}
            <button onClick={printGenerate}>Gerar print</button>
          </div>
          {order.status.status === 'pending' && (
            <div className='finish-or-cancel'>
              <button 
                className='btn cancel-btn' 
                onClick={() => handleUpdateStatusOrder('rejected', 'Rejeitada')}>
                  Cancelar
              </button>
              <button 
                className='btn submit' 
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