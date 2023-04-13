import './ServiceOrder.css'
import { DeviceData, ModalDevice } from '../../components'

// Icons
import { BsPlus } from 'react-icons/bs'

// Hooks
import { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { newOrder } from '../../slices/orderSlice'

// Context
import { useStateContext } from '../../context/StateContext'

const ServiceOrder = () => {
  const { loading, error } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)

  let { arrayDevices } = useStateContext()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const initialDevices = [{ id: Math.floor(Math.random() * 1000000) }]

  const deviceReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        const newDevice = {
          id: Math.floor(Math.random() * 1000000)
        }

        return [...state, newDevice]
      case 'REMOVE':
        return state.filter((device) => device.id !== action.id) 
      default:
        return state 
    }
  }

  const [devices, dispatchDevices] = useReducer(deviceReducer, initialDevices)

  const handleNewDevice = (e) => {
    e.preventDefault()

    dispatchDevices({type: 'ADD'})
  }

  const removeDevice = (id) => {
    
    dispatchDevices({type: 'REMOVE', id})
  }

  // const formatObj = (obj) => {
  //   const device = {
  //     deviceType: obj.deviceType,
  //     brand: obj.brand,
  //     model: obj.model,
  //     color: obj.color,
  //     problemDesc: obj.problemDesc
  //   }
  //   console.log(device)
  // }

  // formatObj(devices[0])

  const handleSubmit = (e) => {
    e.preventDefault()

    // const serviceOrder = {
    //   name,
    //   phoneNumber,
    //   address,
    //   userId: user.uid,
    //   createdBy: user.displayName
    // }
    console.log(devices)

    // dispatch(newOrder(serviceOrder))
    // devices.map((device) => arrayDevices.push(device))
    // console.log(arrayDevices)
  }

  // useEffect(() => {
  //   arrayDevices = [...devices]
  //   console.log(arrayDevices)
  // }, [devices])
  useEffect(() => {
    console.log(arrayDevices)
  }, [arrayDevices])

  return (
    <ModalDevice />
    // <div>
    //   <h2 className='w-100 text-center sm:text-sm md:text-3xl lg:text-3xl'>Nova ordem de serviço</h2>
    //   <form onSubmit={handleSubmit} className='w-100 sm:w-12/12 md:w-12/12'>
    //       <label>
    //         <span>Nome:</span> 
    //         <input 
    //           type="text" 
    //           placeholder='Nome do cliente'
    //           onChange={(e) => setName(e.target.value)}
    //           value={name}
    //         />
    //       </label>
    //       <label>
    //         <span>Telefone:</span>
    //         <input 
    //           type="tel" 
    //           placeholder='(XX)X XXXX-XXXX'
    //           onChange={(e) => setPhoneNumber(e.target.value)}
    //           value={phoneNumber} 
    //         />
    //       </label>
    //       <label>
    //         <span>Endereço:</span>
    //         <input 
    //           type="text" 
    //           placeholder='Ex: Av Brasil'
    //           onChange={(e) => setAddress(e.target.value)}
    //           value={address} 
    //         />
    //       </label>
    //       {devices && devices.map((device) =>(
    //           <div key={device.id}>
    //             <DeviceData handleDelete={() => removeDevice(device.id)} device={device} />
    //           </div>
    //         )
    //       )}
    //       <div className='new-section'>
    //         <button onClick={handleNewDevice}>
    //           <BsPlus />
    //           Add dispositivo
    //         </button>
    //       </div>
    //       <div className='finish-or-cancel w-100 sm:align-middle md:align-middle lg:align-middle'>
    //         <Link className='cancel-btn' to='/'>Cancelar</Link>
    //         {!loading && <input type="submit" value="Finalizar" />}
    //         {loading && <input type="submit" value="Aguarde.." disabled />}
    //         {error && <Message msg={error} type='error' />}
    //       </div>
    //   </form>
    // </div>
  )
}

export default ServiceOrder