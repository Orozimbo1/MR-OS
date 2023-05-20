import './Settings.css'

// Icons
import { BsExclamationTriangle, BsPerson } from 'react-icons/bs'
import { MdPassword } from 'react-icons/md'
import { SlUserUnfollow } from 'react-icons/sl'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

// Redux
import { updateUser } from '../../slices/authSlice'

const Settings = () => {
  const { user, loading, error } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [photoURL, setPhotoURL] = useState(user.photoURL || '')
  const [displayName, setDisplayName] = useState(user.displayName)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(user.address || '')
  const [CNPJ, setCNPJ] = useState(user.CNPJ || '')

  const resetInputs = () => {
    setPhotoURL(user.photoURL || '')
    setDisplayName(user.displayName)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(photoURL)
    console.log(displayName)
    const updatedUser = {
      displayName,
      photoURL
    }

    dispatch(updateUser(updatedUser))

  }

  return (
    <main>
      <h2>Meus dados</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='data-image'>
          <div className='profile-image'>
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
          <span>Razão social</span>
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
          />
        </label>
        <label>
          <span>CNPJ</span>
          <input type="text" 
            value={CNPJ}
            onChange={(e) => setCNPJ(e.target.value)}
          />
        </label>
        <div className='danger-zone'>
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
          <button type='button' className='cancel-btn' onClick={resetInputs}>Cancelar</button>
          {!loading && <input type="submit" value="Atualizar" />}
          {loading && <input type="submit" value="Aguarde.." disabled />}
        </div>
      </form>
    </main>
  )
}

export default Settings