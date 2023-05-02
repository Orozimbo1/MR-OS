import './DeviceData.css'

// Icons
import { BsTrash, BsPenFill } from 'react-icons/bs'

// Context
import { useStateContext } from '../../context/StateContext'

function DeviceData({ showActions, handleDelete, device, setDevice }) {
  const { setShowModalDevice } = useStateContext()

  const { id, deviceType, brand, model, color, problemDesc } = device

  const editDevice = () => {
    setDevice(device)
    setShowModalDevice(true)
  }

  return (
      <div id='data'>
        {showActions && (
          <>
            <BsTrash className='trash' onClick={handleDelete}/>
            <BsPenFill className='' onClick={editDevice} />
          </>
        )}
        <div className="tec-data">
            <label>
              <span>Tipo do dispositvo:</span> 
              <p>{deviceType}</p>
            </label>
            <label>
              <span>Marca:</span>
              <p>{brand}</p>
            </label>
            <label>
              <span>Modelo:</span>
              <p>{model}</p>
            </label>
            <label>
              <span>Cor:</span>
              <p>{color}</p>
            </label>
          </div>
          <label>
            <span>Descrição do problema:</span>
            <p>{problemDesc}</p>
          </label>
      </div>
  )
}

export default DeviceData