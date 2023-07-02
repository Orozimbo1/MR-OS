import styles from './ModalDevice.module.css'
import { useState, useReducer, useEffect } from 'react'

// Context
import { useStateContext } from '../../context/StateContext'

// Components
import { Message } from '../../components'
import { BsExclamationCircle, BsPenFill, BsTrash } from 'react-icons/bs'

const ModalDevice = ({ handleNewDevice, device, handleEditDevice, setDevice }) => {
  const { setShowModalDevice } = useStateContext()

  const [deviceType, setDeviceType] = useState(device.deviceType || '')
  const [brand, setBrand] = useState(device.brand || '')
  const [model, setModel] = useState(device.model || '')
  const [color, setColor] = useState(device.color || '')
  const [problemDesc, setProblemDesc] = useState(device.problemDesc || '')
  const [labor, setLabor] = useState(device.labor || '')
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [partName, setPartName] = useState('')
  const [partPrice, setPartPrice] = useState('')
  const [edit, setEdit] = useState(false)
  const [partId, setPartId] = useState('')
  let totalParts

  const initialParts = []

  useEffect(() => {
    if(device.parts) {
      device.parts.map((part) => initialParts.push(part))
    }
  }, [])

  const partsReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        const newPart = {
          id: Math.random(),
          part: partName,
          price: parseInt(partPrice)
        }
        setPartName('')
        setPartPrice('')

        return [...state, newPart]
      case 'REMOVE':
        return state.filter((part) => part.id !== action.id) 
      case 'EDIT':
        const updatedPart = {
          part: action.part.part,
          price: parseInt(action.part.price)
        }

        setPartName('')
        setPartPrice('')
        setEdit(false)

        let index = state.findIndex(element => element.id === action.part.id)
        state[index] = {...updatedPart}
        
        return [...state]
      default:
        return state 
    }
  }

  const [parts, dispatchParts] = useReducer(partsReducer, initialParts)

  const addPart = () => {
    if(partName.length <= 0 || partPrice.length <= 0) return
    dispatchParts({type: 'ADD'})
  }

  const removePart = (id) => {
    dispatchParts({type: 'REMOVE', id})
  }

  const editPart = (part) => {
    dispatchParts({type: 'EDIT', part})
  }

  const reset = () => {
    setDevice({})
    setShowModalDevice(false)
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
    if(!labor) {
      setError('O campo mão de obra é obrigatório')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validate = validateInputs()

    if(!validate) return

    totalParts = parts.reduce((acc, val) => acc + val.price , 0)

    const device = {
      deviceType,
      brand,
      model,
      color,
      problemDesc,
      parts: parts,
      labor,
      total: total,
      totalParts
    }

    handleNewDevice({type: 'ADD-DEVICE', device: device})
    setShowModalDevice(false)
  }

  const handleEdit = () => {
    const validate = validateInputs()

    if(!validate) return

    totalParts = parts.reduce((acc, val) => acc + val.price , 0)

    const deviceEdited = {
      id: device.id,
      deviceType,
      brand,
      model,
      color,
      problemDesc,
      parts: parts,
      labor,
      total,
      totalParts
    }

    handleEditDevice({type: 'EDIT', device: deviceEdited})
    setDevice({})
    setShowModalDevice(false)
  }

  useEffect(() => {  
    if(labor) {
      setTotal(parseInt(labor) + parts.reduce((acc, val) => acc + val.price , 0))
    } else {
      setTotal(0 + parts.reduce((acc, val) => acc + val.price , 0))
    }
  }, [parts, labor]) 

  return (
    <div className={styles.modal_container}>
      <div className='blackout' onClick={reset}></div>
      <div className={styles.modal}>
        <div className={styles.new_device}>
          <h2>Novo dispositivo</h2>
        </div>
        <div className={styles.tec_data_modal}>
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
          <div className={styles.todo}>
            <label>
              <span>Peça:</span>
              <input type="text" value={partName} onChange={(e) => setPartName(e.target.value)}/>
            </label>
            <label>
              <span>Valor:</span>
              <input type="number" value={partPrice} onChange={(e) => setPartPrice(e.target.value)}/>
            </label>
            {!edit 
              ? <button onClick={() => addPart()}>+Add peça</button>
              : <button onClick={() => editPart( {id: partId, part: partName, price: partPrice} )}>Editar</button>
            }
          </div>
          {parts.length > 0 && parts.map((part, i) => (
            <li key={part.id} className={styles.parts}>
              <span>{i + 1} -</span>
              <p className={styles.part_name}>{part.part}</p>
              <p className={styles.part_price}>R$: {part.price}</p>
              <div className={styles.icons}>
                <BsTrash onClick={() => removePart(part.id)}/>
                {!edit 
                ? <BsPenFill onClick={() => {
                  setPartId(part.id)
                  setEdit(true)
                  setPartName(part.part)
                  setPartPrice(part.price)
                }} /> 
                : <BsExclamationCircle onClick={() => {
                  setEdit(false)
                  setPartName('')
                  setPartPrice('')
                }} />
                }   
              </div> 
            </li>
          ))}
          <label>
            <span>Mão de obra:</span>
            <input type="number" placeholder='R$: 99,99' value={labor} onChange={(e) => setLabor(e.target.value)} />
          </label>
          <h3>
            Total: R$: <span>{total}</span> 
          </h3>
          <div className='finish-or-cancel'>
            <button className='cancel-btn' onClick={reset}>Cancelar</button>
            {!device.id && <input type="submit" value="Adicionar" onClick={handleSubmit}/>}
            {device.id && <input type="submit" value="Editar" onClick={handleEdit}/>}
          </div>
          {error && <Message msg={error} type='error' />}
      </div>
    </div>
  )
}

export default ModalDevice