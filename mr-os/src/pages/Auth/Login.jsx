import './Auth.css'

import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div id='auth'>
      <h2><span>Login</span></h2>
      <form>
        <label>
          <span>Email:</span>
          <input 
            type="email"
            placeholder='Digite seu email' 
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
            type="password"
            placeholder='Digite sua senha' 
          />
        </label>
        <input type="submit" value="Entrar" />
      </form>
      <p>Não tem conta? <Link to='/register'>Clique aqui</Link> </p>
    </div>
  )
}

export default Login