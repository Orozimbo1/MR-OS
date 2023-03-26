import './Device.css'

function DeviceData() {
  return (
      <div id='data'>
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
      </div>
  )
}

export default DeviceData