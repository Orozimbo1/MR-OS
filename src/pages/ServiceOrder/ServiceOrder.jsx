import styles from './ServiceOrder.module.css'

// Icons
import { BsPlus } from 'react-icons/bs'

// Hooks
import { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { newOrder } from '../../slices/orderSlice'

// Context
import { useStateContext } from '../../context/StateContext'

// Components
import { DeviceData, ModalDevice, Message} from '../../components'
import { OrderPDF } from '../../components'

const ServiceOrder = () => {
  const { loading } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)

  let { setShowModalDevice, showModalDevice } = useStateContext()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [device, setDevice] = useState({})
  const [error, setError] = useState('') 
  const [total, setTotal] = useState(0)

  const initialDevices = []

  const deviceReducer = (state, action) => {
    switch (action.type) {
      case 'ADD-DEVICE':
        const newDevice = {
          id: Math.floor(Math.random() * 1000000),
          deviceType: action.device.deviceType,
          brand: action.device.brand,
          model: action.device.model,
          color: action.device.color,
          problemDesc: action.device.problemDesc,
          parts: action.device.parts,
          labor: action.device.labor,
          total: action.device.total,
          totalParts: action.device.totalParts
        }

        return [...state, newDevice]
      case 'REMOVE':
        return state.filter((device) => device.id !== action.id) 
      case 'EDIT':
        const updatedDevice = {
          id: action.device.id,
          deviceType: action.device.deviceType,
          brand: action.device.brand,
          model: action.device.model,
          color: action.device.color,
          problemDesc: action.device.problemDesc,
          parts: action.device.parts,
          labor: action.device.labor,
          total: action.device.total,
          totalParts: action.device.totalParts
        }
        
        let index = state.findIndex(element => element.id === action.device.id)
        state[index] = {...updatedDevice}
        return [...state]
      case 'RESET': 
        return [...initialDevices]
      default:
        return state 
    }
  }

  const [devices, dispatchDevices] = useReducer(deviceReducer, initialDevices)

  const reset = () => {
    setName('')
    setAddress('')
    setDevice('')
    setPhoneNumber('')

    dispatchDevices({type: 'RESET'})
  }

  const removeDevice = (id) => {
    dispatchDevices({type: 'REMOVE', id})
  }

  const addDevice = (device) => {
    dispatchDevices({type: 'ADD-DEVICE', ...device})
  }

  const editDevice = (device) => {
    dispatchDevices({type: 'EDIT', ...device})
  }

  const validateInputs = () => {
    if(!name) {
      setError('O campo nome é obrigatório')
      return false
    }
    if(!phoneNumber) {
      setError('O campo telefone é obrigatório')
      return false
    }
    return true
  } 

  const handleSubmit = (e) => {
    e.preventDefault()

    const displayName = user.displayName
    const logo = user.photoURL && user.photoURL 
    console.log(user.photoURL)
    
    // const validate = validateInputs()
    
    // if(!validate) return
    
    const serviceOrder = {
      name,
      phoneNumber,
      devices,
      address,
      userId: user.uid,
      createdBy: user.displayName,
      status: {status: 'pending', text: 'Em andamento'},
      total
    }
      
    // dispatch(newOrder(serviceOrder))
    OrderPDF(serviceOrder, displayName, logo )
    // reset()
    // navigate('/')
  }

  useEffect(() => {
    setTotal(devices.reduce((acc, val) => acc + val.total, 0))
  })

  return (
    <div className={styles.service_order_container}>
      {showModalDevice && 
        <ModalDevice 
          handleNewDevice={addDevice} 
          device={device} 
          handleEditDevice={editDevice} 
          setDevice={setDevice}
      />}
      <h2>Nova ordem de serviço</h2>
      <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span> 
            <input 
              type="text" 
              placeholder='Nome do cliente'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span>Telefone:</span>
            <input 
              type="tel" 
              placeholder='(XX)X XXXX-XXXX'
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber} 
            />
          </label>
          <label>
            <span>Endereço:</span>
            <input 
              type="text" 
              placeholder='Ex: Av Brasil'
              onChange={(e) => setAddress(e.target.value)}
              value={address} 
            />
          </label>
          {devices && devices.map((device) =>(
              <div key={device.id}>
                <DeviceData 
                  showActions={true}
                  handleDelete={() => removeDevice(device.id)} 
                  device={device} 
                  setDevice={setDevice}
                  />
              </div>
            )
          )}
          <div className={styles.new_section}>
            <button type='button' onClick={() => setShowModalDevice(true)}>
              <BsPlus />
              Add dispositivo
            </button>
          </div>
          <div className='total'>
            <h4>Total</h4>
            <p>R$: {total}</p>
          </div>
          <div className='finish-or-cancel'>
            <Link className='btn cancel-btn' to='/'>Cancelar</Link>
            {!loading && <input type="submit" value="Finalizar" className='btn'/>}
            {loading && <input type="submit" value="Aguarde.." disabled />}
          </div>
          {error && <Message msg={error} type='error' />}
      </form>
    </div>
  )
}

export default ServiceOrder