import './ServiceOrder.css'
import { DeviceData } from '../../components'

// Icons
import { BsPlus } from 'react-icons/bs'

// Hooks
import { useReducer } from 'react'

const ServiceOrder = () => {
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

  return (
    <div>
      <h2>Nova ordem de serviço</h2>
      <form>
          <label>
            <span>Nome:</span> 
            <input type="text" placeholder='Nome do cliente' />
          </label>
          <label>
            <span>Telefone:</span>
            <input type="tel" placeholder='(XX)X XXXX-XXXX' />
          </label>
          <label>
            <span>Endereço:</span>
            <input type="text" placeholder='Ex: Av Brasil' />
          </label>
          {devices && devices.map((device) => (
              <div key={device.id} onDoubleClick={() => removeDevice(device.id)}>
                <DeviceData />
              </div>
            ))
          }
          <div className='new-section'>
            <button onClick={handleNewDevice}>
              <BsPlus />
              Add dispositivo
            </button>
          </div>
            <input type="submit" value="Finalizar" />
      </form>
    </div>
  )
}

export default ServiceOrder