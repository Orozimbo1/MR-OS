import './ModalDevice.css'
import { useState, useReducer } from 'react'

// Context
import { useStateContext } from '../../context/StateContext'

// Components
import { Message } from '../../components'
import { BsCheck, BsCheck2All, BsTrash } from 'react-icons/bs'

const ModalDevice = ({ handleNewDevice, device, handleEditDevice, setDevice }) => {
  const { setShowModalDevice } = useStateContext()

  const [deviceType, setDeviceType] = useState(device.deviceType || '')
  const [brand, setBrand] = useState(device.brand || '')
  const [model, setModel] = useState(device.model || '')
  const [color, setColor] = useState(device.color || '')
  const [problemDesc, setProblemDesc] = useState(device.problemDesc || '')
  const [error, setError] = useState('')
  const [part, setPart] = useState('')
  const [partPrice, setPartPrice] = useState(0)

  const initialParts = []

  const partsReducer = (state, action) => {
    switch (action.type) {
      case 'ADD-PART':
        const newPart = {id: 2}
        return [...state, newPart]
      case 'REMOVE':
        return state.filter((device) => device.id !== action.id) 
      case 'EDIT':
        const updatedDevice = {
        }
        let index = state.findIndex(element => element.id === action.device.id)
        state[index] = {...updatedDevice}
        return [...state]
      case 'RESET': 
        return [...initialDevices]
      default:
        return state 
    }
  }

  const [parts, dispatchParts] = useReducer(partsReducer, initialParts)

  const initialAllParts = []

  const allPartsReducer = (state, action) => {
    switch (action.type) {
      case 'ADD-IN-ALL-PARTS':
        const newPart = {part: action.part, price: action.price}
        return [...state, newPart]
      case 'REMOVE':
        return state.filter((part) => part.id !== action.id) 
      case 'EDIT':
        const updatedDevice = {
        }
        let index = state.findIndex(element => element.id === action.device.id)
        state[index] = {...updatedDevice}
        return [...state]
      case 'RESET': 
        return [...initialDevices]
      default:
        return state 
    }
  }

  const [allParts, dispatchAllParts] = useReducer(allPartsReducer, initialAllParts)

  const addPart = () => {
    dispatchParts({type: 'ADD-PART'})
  }

  const removePart = (id) => {
    dispatchParts({type: 'REMOVE', id})
  }

  const addInAllParts = (part) => {
    dispatchAllParts({type: 'ADD-IN-ALL-PARTS', part})
    console.log(allParts)
  }

  const validateInputs = () => {
    if(!deviceType) {
      setError('O campo tipo de dispositivo é obrigatório')
      return false
    }
    if(!brand) {
      setError('O campo marca é obrigatório')
      return false
    }
    if(!model) {
      setError('O campo modelo é obrigatório')
      return false
    }
    if(!color) {
      setError('O campo cor é obrigatório')
      return false
    }
    if(!problemDesc) {
      setError('O campo descrição do problema é obrigatório')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validate = validateInputs()

    if(!validate) return

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
      id: device.id,
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
        <div className='new-device'>
          <h2>Novo dispositivo</h2>
        </div>
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
          {allParts.length > 0 && allParts.map((part, i) => (
            <div key={i}>
              <p>{part.part}</p>
              <p>{part.price}</p>
            </div>
          ))}
          {parts.length > 0 && parts.map((partInd, i) => (
            <div className="parts" key={i}>
              <label>
                <span>Peça:</span>
                <input type="text" value={part} onChange={(e) => setPart(e.target.value)}/>
              </label>
              <label>
                <span>Valor:</span>
                <input type="number" value={partPrice} onChange={(e) => setPartPrice(e.target.value)}/>
              </label>
              <div className="icons">
                <BsCheck2All onClick={() => {
                  addInAllParts({part: part, price: partPrice})
                  removePart(partInd.id)
                }} />
                <BsTrash />
              </div>
            </div>
          ))}
          {parts.length === 0 && <button onClick={() => addPart()}>+Add peça</button>}
          <label>
            <span>Mão de obra:</span>
            <input type="number" placeholder='R$: 99,99' />
          </label>
          <div className='finish-or-cancel'>
            <button className='cancel-btn' onClick={() => setShowModalDevice(false)}>Cancelar</button>
            {!device.id && <input type="submit" value="Adicionar" onClick={handleSubmit}/>}
            {device.id && <input type="submit" value="Editar" onClick={handleEdit}/>}
          </div>
          {error && <Message msg={error} type='error' />}
      </div>
    </div>
  )
}

export default ModalDevice