import './Device.css'

import { BsPlus } from 'react-icons/bs'

function DeviceData() {
  const handleNewDevice = (e) => {
    e.preventDefault()
  }

  return (
      <form id='dados'>
        <div className="tec-data">
          <label>
            <span>Tipo do dispositvo:</span> 
            <input type="text" placeholder='Ex: Celular, televisão, computador' />
          </label>
          <label>
            <span>Modelo:</span>
            <input type="text" placeholder='Ex: LG smart' />
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
        <div className='new-section'>
          <button onClick={handleNewDevice}>
            <BsPlus />
            Add dispositivo
          </button>
        </div>
      </form>
  )
}

export default DeviceData