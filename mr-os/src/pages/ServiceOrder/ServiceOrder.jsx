import './ServiceOrder.css'
import { DeviceData } from '../../components'

// Icons
import { BsPlus } from 'react-icons/bs'

// Hooks
import { useReducer } from 'react'
import { Link } from 'react-router-dom'

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
      <h2 className='w-100 text-center sm:text-sm md:text-3xl lg:text-3xl'>Nova ordem de serviço</h2>
      <form className='w-100 sm:w-10 sm:h-52 md:w-52 md:h-52 lg:w-100 lg:w-52'>
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
          <div className='finish-or-cancel w-100 sm:align-middle md:align-middle lg:align-middle'>
            <Link className='cancel-btn' to='/'>Cancelar</Link>
            <input type="submit" value="Finalizar" />
          </div>
      </form>
    </div>
  )
}

export default ServiceOrder