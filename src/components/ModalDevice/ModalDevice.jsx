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
  const [technicalReport, setTechnicalReport] = useState(device.technicalReport || '')
  const [error, setError] = useState('')
  const [partName, setPartName] = useState('')
  const [partPrice, setPartPrice] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [edit, setEdit] = useState(false)
  const [partId, setPartId] = useState('')
  const [serviceId, setServiceId] = useState('')
  let totalParts
  let totalServices

  const initialParts = []
  const initialServices = []

  useEffect(() => {
    if(device.parts) {
      device.parts.map((part) => initialParts.push(part))
    }
    if(device.services) {
      device.services.map((service) => initialServices.push(service))
    }
  }, [])

  // Reducer de Peças
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

  // Reducer de Serviços
  const servicesReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        const newService = {
          id: Math.random(),
          service: serviceName,
          price: parseInt(servicePrice)
        }
        setServiceName('')
        setServicePrice('')

        return [...state, newService]
      case 'REMOVE':
        return state.filter((service) => service.id !== action.id) 
      case 'EDIT':
        const updatedService = {
          service: action.service.service,
          price: parseInt(action.service.price)
        }

        setServiceName('')
        setServicePrice('')
        setEdit(false)

        let index = state.findIndex(element => element.id === action.service.id)
        state[index] = {...updatedService}
        
        return [...state]
      default:
        return state 
    }
  }

  const [services, dispatchServices] = useReducer(servicesReducer, initialServices)

  const addService = () => {
    if(serviceName.length <= 0 || servicePrice.length <= 0) return
    dispatchServices({type: 'ADD'})
  }

  const removeService = (id) => {
    dispatchServices({type: 'REMOVE', id})
  }

  const editService = (service) => {
    dispatchServices({type: 'EDIT', service})
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
    if(!technicalReport) {
      setError('O campo laudo técnico é obrigatório')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validate = validateInputs()

    if(!validate) return

    totalParts = parts.reduce((acc, val) => acc + val.price , 0)
    totalServices = services.reduce((acc, val) => acc + val.price , 0)

    const device = {
      deviceType,
      brand,
      model,
      color,
      problemDesc,
      technicalReport,
      parts: parts,
      services: services,
      total: totalParts + totalServices,
      totalParts,
      totalServices
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
      technicalReport,
      parts: parts,
      services: services,
      total: totalParts + totalServices,
      totalParts,
      totalServices
    }

    handleEditDevice({type: 'EDIT', device: deviceEdited})
    setDevice({})
    setShowModalDevice(false)
  }

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
          <label>
            <span>Laudo técnico:</span>
            <textarea 
              placeholder='Descreva a solução dada pelo técnico'
              onChange={(e) => setTechnicalReport(e.target.value)}
              value={technicalReport}
            >
            </textarea>
          </label>
          {/* todo peça */}
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
              ? <button onClick={() => addPart()}>+ Add</button>
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
          {/* todo serviço */}
          <div className={styles.todo}>
            <label>
              <span>Serviço:</span>
              <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)}/>
            </label>
            <label>
              <span>Valor:</span>
              <input type="number" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)}/>
            </label>
            {!edit 
              ? <button onClick={() => addService()}>+ Add</button>
              : <button onClick={() => editService( {id: serviceId, service: serviceName, price: servicePrice} )}>Editar</button>
            }
          </div>
          {services.length > 0 && services.map((service, i) => (
            <li key={service.id} className={styles.parts}>
              <span>{i + 1} -</span>
              <p className={styles.part_name}>{service.service}</p>
              <p className={styles.part_price}>R$: {service.price}</p>
              <div className={styles.icons}>
                <BsTrash onClick={() => removeService(service.id)}/>
                {!edit 
                ? <BsPenFill onClick={() => {
                  setServiceId(service.id)
                  setEdit(true)
                  setServiceName(service.service)
                  setServicePrice(service.price)
                }} /> 
                : <BsExclamationCircle onClick={() => {
                  setEdit(false)
                  setServiceName('')
                  setServicePrice('')
                }} />
                }   
              </div> 
            </li>
          ))}
          <div className='total'>
            <h4>Total</h4>
            <p>R$:{services.reduce((acc, val) => acc + val.price , 0) + parts.reduce((acc, val) => acc + val.price , 0)}</p>
          </div>
          <div className='finish-or-cancel'>
            <button className='btn cancel-btn' onClick={reset}>Cancelar</button>
            {!device.id && <input type="submit" value="Adicionar" className='btn' onClick={handleSubmit}/>}
            {device.id && <input type="submit" value="Editar" className='btn' onClick={handleEdit}/>}
          </div>
          {error && <Message msg={error} type='error' />}
      </div>
    </div>
  )
}

export default ModalDevice