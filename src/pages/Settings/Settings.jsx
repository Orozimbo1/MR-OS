import styles from './Settings.module.css'

// Icons
import { BsExclamationTriangle, BsPerson } from 'react-icons/bs'
import { MdPassword } from 'react-icons/md'
import { SlUserUnfollow } from 'react-icons/sl'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux
import { updateUser } from '../../slices/authSlice'
import { registerUserData, updateUserData } from '../../slices/userDataSlice'

// Components
import { Message } from '../../components'

const Settings = () => {
  const { user, loading, error } = useSelector((state) => state.auth)
  const { userData } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [photoURL, setPhotoURL] = useState(user.photoURL || '')
  const [displayName, setDisplayName] = useState(user.displayName)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(userData ? userData.address : '')
  const [CNPJ, setCNPJ] = useState(userData ? userData.CNPJ : '')

  const resetInputs = () => {
    setPhotoURL(user.photoURL || '')
    setDisplayName(user.displayName)
    setAddress(userData.address || '')
    setCNPJ(userData.CNPJ || '')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedUser = {
      displayName,
      photoURL
    }

    if(displayName !== user.displayName || photoURL !== user.photoURL) {
      dispatch(updateUser(updatedUser))
      navigate('/')
      return
    }
    
    if(userData && address != userData.address || CNPJ != userData.CNPJ) {
      const updatedDataUser = {
        address,
        CNPJ
      }

      dispatch(updateUserData({id: userData.id, document: updatedDataUser}))
      navigate('/')
      return
    }

    if(!userData) {
      const registeringUserData = {
        userId: user.uid,
        address,
        CNPJ
      }
      
      dispatch(registerUserData(registeringUserData))
      navigate('/')
    }

  }

  return (
    <main>
      <h2>Meus dados</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.data_image}>
          <div className={styles.profile_image}>
            {photoURL ? 
              <img src={photoURL} alt="Foto de perfil" />
              : <BsPerson />
            }
          </div>
          <label>
            <span>URL da imagem:</span>
            <input 
              type="text" 
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </label>
        </div>
        <label>
          <span>Nome Fantasia</span>
          <input type="text" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Email</span>
          <input type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </label>
        <label>
          <span>Endereço</span>
          <input type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Ex: Av Brasil'
          />
        </label>
        <label>
          <span>CNPJ</span>
          <input type="text" 
            value={CNPJ}
            onChange={(e) => setCNPJ(e.target.value)}
            placeholder='111.111.11/0001.87'
          />
        </label>
        <div className={styles.danger_zone}>
          <span><BsExclamationTriangle /> Danger zone</span>
          <button type='button' onClick={() => alert('Estamos trabalhando nisso. ;)')}>
              <SlUserUnfollow />
              Excluir conta
          </button>
          <button type='button' onClick={() => alert('Estamos trabalhando nisso. ;)')}>
              <MdPassword />
              Redefinir senha
          </button>
        </div>
        <div className='finish-or-cancel'>
          <button type='button' className='btn cancel-btn' onClick={resetInputs}>Cancelar</button>
          {!loading && <input type="submit" value="Atualizar" className='btn' />}
          {loading && <input type="submit" value="Aguarde.." className='btn' disabled />}
        </div>
        {error && <Message msg={error} type='error' />}
      </form>
    </main>
  )
}

export default Settings