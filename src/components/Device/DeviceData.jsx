import styles from './DeviceData.module.css'

// Icons
import { BsTrash, BsPenFill } from 'react-icons/bs'

// Context
import { useStateContext } from '../../context/StateContext'

function DeviceData({ showActions, handleDelete, device, setDevice }) {
  const { setShowModalDevice } = useStateContext()

  const { deviceType, brand, model, color, problemDesc, total } = device

  const editDevice = () => {
    setDevice(device)
    setShowModalDevice(true)
  }

  return (
      <div id={styles.data}>
        {showActions && (
          <>
            <BsTrash className={styles.trash} onClick={handleDelete}/>
            <BsPenFill onClick={editDevice} />
          </>
        )}
        <div className={styles.tec_data}>
          <p><span>Tipo do dispositvo:</span> {deviceType}</p>
          <p><span>Marca:</span> {brand}</p>
          <p><span>Modelo:</span> {model}</p>
          <p><span>Cor:</span> {color}</p>
          <div className={styles.problem_desc}>
            <span>Descrição do problema:</span>
            <p>{problemDesc}</p>
          </div>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <p><strong>R$: </strong>{total}</p>
          </div>
        </div>
      </div>
  )
}

export default DeviceData