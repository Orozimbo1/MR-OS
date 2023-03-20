import './ServiceOrder.css'
import { DeviceData } from '../../components'

const ServiceOrder = () => {
  return (
    <div>
      <form action="">
          <label>
            <span>Nome:</span> 
            <input type="text" />
          </label>
          <label>
            <span>Telefone:</span>
            <input type="text" />
          </label>
          <label>
            <span>Endereço:</span>
            <input type="text" />
          </label>
      </form>
      <DeviceData />
    </div>
  )
}

export default ServiceOrder