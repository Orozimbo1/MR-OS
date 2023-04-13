import './ModalDevice.css'
import { useState } from 'react'

import { useStateContext } from '../../context/StateContext'

const ModalDevice = ({ handleNewDevice }) => {
  const { setShowModalDevice } = useStateContext()

  const [deviceType, setDeviceType] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [problemDesc, setProblemDesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const device = {
      deviceType,
      brand,
      model,
      color,
      problemDesc
    }

    handleNewDevice({type: 'ADD-DEVICE', device})
    setShowModalDevice(false)
  }

  return (
    <div className='modal-container'>
      <div className='blackout' onClick={() => setShowModalDevice(false)}></div>
      <div className='modal'>
        <div className="tec-data">
            <label>
              <span>Tipo do dispositvo:</span> 
              <input 
                type="text" placeholder='Ex: Celular, televisão, computador' 
                onChange={(e) => setDeviceType(e.target.value)}
                value={deviceType}
              />
            </label>
            <label>
              <span>Marca:</span>
              <input 
                type="text" placeholder='Ex: LG, Samsung' 
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
            </label>
            <label>
              <span>Modelo:</span>
              <input 
                type="text" placeholder='Ex: Smart Tv L180' 
                onChange={(e) => setModel(e.target.value)}
                value={model}
              />
            </label>
            <label>
              <span>Cor:</span>
              <input 
                type="text" placeholder='Cor do dispositivo' 
                onChange={(e) => setColor(e.target.value)}
                value={color}
              />
            </label>
          </div>
          <label>
            <span>Descrição do problema:</span>
            <textarea 
              placeholder='Descreva o problema do dispositivo'
              onChange={(e) => setProblemDesc(e.target.value)}
              value={problemDesc}
            >
            </textarea>
          </label>
          <div className='finish-or-cancel'>
            <button className='cancel-btn' onClick={() => setShowModalDevice(false)}>Cancelar</button>
            <input type="submit" value="Adicionar" onClick={handleSubmit}/>
          </div>
      </div>
    </div>
  )
}

export default ModalDevice