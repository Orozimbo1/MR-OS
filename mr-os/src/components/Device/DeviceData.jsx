import './Device.css'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { addDevice } from '../../slices/orderSlice'

// Icons
import { BsTrash } from 'react-icons/bs'

function DeviceData({ handleDelete, device }) {
  const { arrayDevices, } = useSelector((state) => state.order)

  const dispatch = useDispatch()

  const [deviceType, setDeviceType] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [problemDesc, setProblemDesc] = useState('')

  const formatObj = () => {

    if(!deviceType) {
      return
    } else if (!brand) {
      return
    } else if (!model) {
      return
    } else if (!color) {
      return
    } else if (problemDesc) {
      return
    } else {
      device = {
        ...device,
        deviceType,
        brand,
        model,
        color,
        problemDesc
      }
    
      dispatch(addDevice(device))
      console.log(arrayDevices)
    }
  }

  return (
      <div id='data' onBlur={formatObj}>
        <BsTrash className='trash' onClick={handleDelete}/>
        <div className="tec-data">
            <label>
              <span>Tipo do dispositvo:</span> 
              <input 
                type="text" placeholder='Ex: Celular, televisão, computador' 
                // onChange={(e) => setDeviceType(e.target.value)}
                // value={deviceType}
                onBlur={(e) => setDeviceType(e.target.value)}
              />
            </label>
            <label>
              <span>Marca:</span>
              <input 
                type="text" placeholder='Ex: LG, Samsung' 
                // onChange={(e) => setBrand(e.target.value)}
                // value={brand}
                onBlur={(e) => setBrand(e.target.value)}
              />
            </label>
            <label>
              <span>Modelo:</span>
              <input 
                type="text" placeholder='Ex: Smart Tv L180' 
                // onChange={(e) => setModel(e.target.value)}
                // value={model}
                onBlur={(e) => setModel(e.target.value)}
              />
            </label>
            <label>
              <span>Cor:</span>
              <input 
                type="text" placeholder='Cor do dispositivo' 
                // onChange={(e) => setColor(e.target.value)}
                // value={color}
                onBlur={(e) => setColor(e.target.value)}
              />
            </label>
          </div>
          <label>
            <span>Descrição do problema:</span>
            <textarea 
              placeholder='Descreva o problema do dispositivo'
              // onChange={(e) => setProblemDesc(e.target.value)}
              // value={problemDesc}
              onBlur={(e) => setProblemDesc(e.target.value)}
            >
            </textarea>
          </label>
      </div>
  )
}

export default DeviceData