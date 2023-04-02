import './Device.css'

// Icons
import { BsTrash } from 'react-icons/bs'

function DeviceData({ handleDelete }) {
  return (
      <div id='data'>
        <BsTrash className='trash' onClick={handleDelete}/>
        <div className="tec-data">
          <label>
            <span>Tipo do dispositvo:</span> 
            <input type="text" placeholder='Ex: Celular, televisão, computador' />
          </label>
          <label>
            <span>Marca:</span>
            <input type="text" placeholder='Ex: LG, Samsung' />
          </label>
          <label>
            <span>Modelo:</span>
            <input type="text" placeholder='Ex: Smart Tv L180' />
          </label>
          <label>
            <span>Cor:</span>
            <input type="text" placeholder='Cor do dispositivo' />
          </label>
        </div>
        <label>
          <span>Descrição do problema:</span>
          <textarea placeholder='Descreva o problema do dispositivo'>
          </textarea>
        </label>
      </div>
  )
}

export default DeviceData