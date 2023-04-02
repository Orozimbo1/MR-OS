import './ServiceOrder.css'
import { DeviceData } from '../../components'

// Icons
import { BsPlus } from 'react-icons/bs'

// Hooks
import { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { newOrder, reset } from '../../slices/orderSlice'

const ServiceOrder = () => {
  const { loading, error } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const initialDevices = []

  const deviceReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        const newDevice = {
          id: Math.random()
        }

        return [...state, newDevice]
      case 'REMOVE':
        return state.filter((device) => device.id !== action.id) 
      default:
        return state 
    }
  }

  const [devices, dispatchDevices] = useReducer(deviceReducer, initialDevices)

  const handleNewDevice = (e) => {
    e.preventDefault()

    dispatchDevices({type: 'ADD'})
  }

  const removeDevice = (id) => {
    
    dispatchDevices({type: 'REMOVE', id})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const serviceOrder = {
      name,
      phoneNumber,
      address,
      userId: user.uid,
      createdBy: user.displayName
    }

    dispatch(newOrder(serviceOrder))
    // console.log(serviceOrder)
  }

  return (
    <div>
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
          {devices && devices.map((device) => (
              <div key={device.id}>
                <DeviceData handleDelete={() => removeDevice(device.id)} />
              </div>
            ))
          }
          <div className='new-section'>
            <button onClick={handleNewDevice}>
              <BsPlus />
              Add dispositivo
            </button>
          </div>
          <div className='finalize-or-cancel'>
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