import styles from './Auth.module.css'

// Components
import { Link } from 'react-router-dom'
import { Message } from '../../components' 

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { register, reset } from '../../slices/authSlice'

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password,
      displayName
    }

    dispatch(register(user))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className={styles.form}>
        <div id={styles.auth}>
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome:</span>
              <input 
                type="text" 
                placeholder='Digite seu nome'
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
            </label>
            <label>
              <span>Email:</span>
              <input 
                type="email" 
                placeholder='Digite seu email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label>
              <span>Senha:</span>
              <input 
                type="password" 
                placeholder='Digite sua senha'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            {!loading && <input type="submit" value="Cadastrar" />}
            {loading && <input type="submit" value="Aguarde.." disabled />}
            {error && <Message msg={error} type='error' />}
          </form>
          <p>Já tem conta? <Link to='/login'>Clique aqui</Link> </p>
      </div>
      <div className={styles.image}>
      </div>
    </div>
   
  )
}

export default Register