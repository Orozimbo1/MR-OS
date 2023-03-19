import './Auth.css'

import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div id='auth'>
      <h2>Cadastre-se</h2>
      <form>
        <label>
          <span>Nome:</span>
          <input 
            type="text" 
            placeholder='Digite seu nome'
          />
        </label>
        <label>
          <span>Email:</span>
          <input 
            type="email" 
            placeholder='Digite seu nome'
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            placeholder='Digite seu nome'
          />
        </label>
        <input type="submit" value="Cadastrar" />
      </form>
      <p>Já tem conta? <Link to='/login'>Clique aqui</Link> </p>
    </div>
  )
}

export default Register