import styles from './Print.module.css'
import logo from '../../assets/logo_completa.png'

// Icons
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaMapMarkerAlt, FaFingerprint } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'

// Context
import { useStateContext } from '../../context/StateContext'

const Print = ({ id, address, name, phoneNumber, createdAt, finishedAt }) => {
  const { setShowPrint } = useStateContext()

  const actualDate = new Date(Date.now()).toLocaleDateString('pt-BR', { timezone: 'UTC' })
  const date = createdAt && createdAt.toDate() && createdAt.toDate().toLocaleDateString('pt-BR', { timezone: 'UTC' })
  const dateFinished = finishedAt && finishedAt.toDate() && finishedAt.toDate().toLocaleDateString('pt-BR', { timezone: 'UTC' })

  return (
    <div className={styles.lightblue} onClick={() => setShowPrint(false)}>
      <div className={styles.print_order}>
        <hr />
        <header className={styles.header}>
          <section className={styles.logo}>
            <img src={logo} alt="Logo da empresa" />
          </section>
          <section className={styles.data}>
            <h1>SSL Assistencia Tecnica Celulares e Informatica</h1>
            <p><FaFingerprint /> CNPJ</p>
            <p><FaMapMarkerAlt /> Endereço</p>
            <p><AiOutlineMessage /> Email</p>
            <p><BsFillPersonCheckFill /> Responsável</p>
          </section>
          <section className={styles.id}>
            <h3>ID OS: <span>{id.split('').slice(0, 6)}</span></h3>
            <p>Emissão: <span>{actualDate}</span></p>
          </section>
        </header>
        <hr />
        <main>
          <section className={styles.client_date}>
            <h2>Cliente</h2>
            <p>{name}</p>
            <p>{address}</p>
            <p>Email:</p>
            <p>{phoneNumber}</p>
          </section>
          <hr />
          <section className={styles.print_status}>
            <h3>Status OS: <span>Orçamento</span></h3>
            <h3>Data inicial: <span>{date}</span></h3>
            <h3>Data final: <span>{dateFinished ? dateFinished : '--/--/----'}</span></h3>
            <h3>Garantia: <span>90 dias</span></h3>
          </section>
          <hr />
          {/* Loop de dispositivos */}
          <section>
            <h3>Dispositivo: <span>Tipo de dispositivo + Marca + Modelo</span></h3>
            <hr />
            <h3>Defeito apresentado: <span>Descrição do problema</span></h3>
            <hr />
            <h3>Laudo técnico: <span>Laudo técnico</span></h3>
            <hr />
            {/* Condicional de peças */}
            <table>
              <tr>
                <td>Produtos</td>
                <td>Qtd</td>
                <td>V. UN R$</td>
                <td>S. Total R$</td>
              </tr>
              {/* Loop de peças */}
              <tr>
                <td>Peça</td>
                <td>Quantidade de peças</td>
                <td>Valor da peça</td>
                <td>Valor Total</td>
              </tr>
              {/* Final de loop */}
              <tr>
                <td>Total</td>
                <td>R$ Valor total</td>
              </tr>
            </table>
          </section>
          <h3>Valor Total da OS: R$:000</h3>
        </main>
        <hr />
        <footer>
          <table>
            <tr>
              <td>Data</td>
              <td>Assinatura do Cliente</td>
              <td>Assinatura do Tecnico Responsável</td>
            </tr>
            <tr>
              <td> . </td>
              <td> . </td>
              <td> . </td>
            </tr>
          </table>
        </footer>
        <hr />
      </div>
    </div>
  )
}

export default Print