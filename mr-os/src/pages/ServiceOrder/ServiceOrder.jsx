import './ServiceOrder.css'
import { DeviceData } from '../../components'

const ServiceOrder = () => {
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
            <input type="submit" value="Finalizar" />
      </form>
    </div>
  )
}

export default ServiceOrder