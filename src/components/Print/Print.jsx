import styles from './Print.module.css'
import logo from '../../assets/logo_completa.png'

// Icons
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaMapMarkerAlt, FaFingerprint } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'

// Context
import { useStateContext } from '../../context/StateContext'

const Print = ({ id }) => {
  const { setShowPrint } = useStateContext()
  
  const actualDate = new Date(Date.now()).toLocaleDateString('pt-BR', { timezone: 'UTC' })

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
          <section>
            <h2>Cliente</h2>
            <p>Nome do Cliente</p>
            <p>Endereço do cliente</p>
            <p>Email</p>
            <p>Celular do cliente</p>
          </section>
          <hr />
          <section>
            <h3>Status da OS: <p>Orçamento</p></h3>
            <h3>Data inicial: <p>10/10/2020</p></h3>
            <h3>Data final: <p>10/10/2020</p></h3>
            <h3>Garantia: <p>90 dias</p></h3>
          </section>
          <hr />
          {/* Loop de dispositivos */}
          <section>
            <h3>Dispositivo: <p>Tipo de dispositivo + Marca + Modelo</p></h3>
            <hr />
            <h3>Defeito apresentado: <p>Descrição do problema</p></h3>
            <hr />
            <h3>Laudo técnico: <p>Laudo técnico</p></h3>
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