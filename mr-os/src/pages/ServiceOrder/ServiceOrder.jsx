import './ServiceOrder.css'
import { DeviceData } from '../../components'

const ServiceOrder = () => {
  return (
    <div>
      <form>
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
          <DeviceData />
          <div id='botoes'>
            <input type="submit" value="Adicionar outro aparelho" className='add' />
            <input type="submit" value="Finalizar" className='finalizar' />
          </div>
      </form>
    </div>
  )
}

export default ServiceOrder