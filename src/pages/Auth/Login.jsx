import './Auth.css'

// Components
import { Link } from 'react-router-dom'
import { Message } from '../../components'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { login, reset } from '../../slices/authSlice'

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    dispatch(login(user))
  }

  // Clean all states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className='formulario'>
      <div id='auth'>
      <h2><span>Login</span></h2>
      <form onSubmit={handleSubmit}>
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
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde.." disabled />}
        {error && <Message msg={error} type='error' />}
      </form>
      <p>Não tem conta? <Link to='/register'>Clique aqui</Link> </p>
    </div>
      <div className='imagem'>

      </div>
    </div>
    
  )
}

export default Login