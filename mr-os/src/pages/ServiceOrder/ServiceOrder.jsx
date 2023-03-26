import './ServiceOrder.css'
import { DeviceData } from '../../components'

// Icons
import { BsPlus } from 'react-icons/bs'

const ServiceOrder = () => {
  const handleNewDevice = () => {

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
          <DeviceData />
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