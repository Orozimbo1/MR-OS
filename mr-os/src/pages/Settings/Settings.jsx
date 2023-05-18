import { BsExclamationTriangle } from 'react-icons/bs'
import { MdPassword } from 'react-icons/md'
import { SlUserUnfollow } from 'react-icons/sl'
import './Settings.css'

const Settings = () => {
  return (
    <main>
      <h2>Meus dados</h2>
      <form>
        <label>
          <span>Razão social</span>
          <input type="text" />
        </label>
        <label>
          <span>Email</span>
          <input type="text" />
        </label>
        <label>
          <span>Endereço</span>
          <input type="text" />
        </label>
        <label>
          <span>CNPJ ou CPF</span>
          <input type="text" />
        </label>
        <div className='danger-zone'>
          <span><BsExclamationTriangle /> Danger zone</span>
          <button type='button' onClick=''>
              <SlUserUnfollow />
              Excluir conta
          </button>
          <button type='button' onClick=''>
              <MdPassword />
              Redefinir senha
          </button>
        </div>
        <div className='finish-or-cancel'>
            <button type='button' className='cancel-btn' to='/'>Cancelar</button>
            <input type="submit" value="Atualizar" />
            {/* {!loading && <input type="submit" value="Finalizar" />}
            {loading && <input type="submit" value="Aguarde.." disabled />} */}
          </div>
      </form>
    </main>
  )
}

export default Settings