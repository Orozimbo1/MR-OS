import './ServiceOrder.css'
import { DeviceData, ModalDevice } from '../../components'

// Icons
import { BsPlus } from 'react-icons/bs'

// Hooks
import { useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { newOrder } from '../../slices/orderSlice'

// Context
import { useStateContext } from '../../context/StateContext'

const ServiceOrder = () => {
  const { loading, error } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)

  let { setShowModalDevice, showModalDevice } = useStateContext()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [device, setDevice] = useState({})

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
          problemDesc: action.device.problemDesc
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
          problemDesc: action.device.problemDesc
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const serviceOrder = {
      name,
      phoneNumber,
      devices,
      address,
      userId: user.uid,
      createdBy: user.displayName
    }

    dispatch(newOrder(serviceOrder))
    reset()
    navigate('/')
  }

  return (
    <div>
      {showModalDevice && 
        <ModalDevice 
          handleNewDevice={addDevice} 
          device={device} 
          handleEditDevice={editDevice} 
          setDevice={setDevice}
      />}
      <h2 className='w-100 text-center sm:text-sm md:text-3xl lg:text-3xl'>Nova ordem de serviço</h2>
      <form onSubmit={handleSubmit} className='w-100 sm:w-12/12 md:w-12/12'>
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
                  handleDelete={() => removeDevice(device.id)} 
                  device={device} 
                  setDevice={setDevice}
                  />
              </div>
            )
          )}
          <div className='new-section'>
            <button type='button' onClick={() => setShowModalDevice(true)}>
              <BsPlus />
              Add dispositivo
            </button>
          </div>
          <div className='finish-or-cancel w-100 sm:align-middle md:align-middle lg:align-middle'>
            <Link className='cancel-btn' to='/'>Cancelar</Link>
            {!loading && <input type="submit" value="Finalizar" />}
            {loading && <input type="submit" value="Aguarde.." disabled />}
            {error && <Message msg={error} type='error' />}
          </div>
      </form>
    </div>
  )
}

export default ServiceOrder