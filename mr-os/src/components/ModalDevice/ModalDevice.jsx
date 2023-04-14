import './ModalDevice.css'
import { useState } from 'react'

import { useStateContext } from '../../context/StateContext'

const ModalDevice = ({ handleNewDevice, device, handleEditDevice, setDevice }) => {
  const { setShowModalDevice } = useStateContext()

  const [deviceType, setDeviceType] = useState(device.deviceType || '')
  const [brand, setBrand] = useState(device.brand || '')
  const [model, setModel] = useState(device.model || '')
  const [color, setColor] = useState(device.color || '')
  const [problemDesc, setProblemDesc] = useState(device.problemDesc || '')

  // if(device) {
  //   console.log(device)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    const device = {
      deviceType,
      brand,
      model,
      color,
      problemDesc
    }

    handleNewDevice({type: 'ADD-DEVICE', device: device})
    setShowModalDevice(false)
  }

  const handleEdit = () => {
    const deviceEdited = {
      deviceType,
      brand,
      model,
      color,
      problemDesc
    }

    handleEditDevice({type: 'EDIT', device: deviceEdited})
    setDevice({})
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
            {!device.id && <input type="submit" value="Adicionar" onClick={handleSubmit}/>}
            {device.id && <input type="submit" value="Editar" onClick={handleEdit}/>}
          </div>
      </div>
    </div>
  )
}

export default ModalDevice