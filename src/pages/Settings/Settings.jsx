import styles from './Settings.module.css'

// Icons
import { BsExclamationTriangle, BsPerson } from 'react-icons/bs'
import { MdPassword } from 'react-icons/md'
import { SlUserUnfollow } from 'react-icons/sl'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInsertDocument, useFetchDocument } from '../../hooks'

// Components
import { Message } from '../../components'

const Settings = () => {
  const { user, loading, error } = useSelector((state) => state.auth)
  const { insertDocument, response } = useInsertDocument('userData');
  const { document, loading: loadingDoc, error: errorDoc } = useFetchDocument('userData', user.uid)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [photoURL, setPhotoURL] = useState(user.photoURL || '')
  const [displayName, setDisplayName] = useState(user.displayName)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState('')
  const [CNPJ, setCNPJ] = useState('')

  useEffect(() => {
    if(document) {
      setAddress(document.address)
      setCNPJ(document.CNPJ)
    }
  }, [document])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    insertDocument({
      userId: user.uid,
      address,
      CNPJ
    })

    alert('Usuário modificado.') // Vai sair

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
          {/* <button type='button' className='btn cancel-btn' onClick={resetInputs}>Cancelar</button> */}
          {!loading && <input type="submit" value="Atualizar" className='btn' />}
          {loading && <input type="submit" value="Aguarde.." className='btn' disabled />}
        </div>
        {/* {error || errorData && <Message msg={error || errorData} type='error' />} */}
      </form>
    </main>
  )
}

export default Settings