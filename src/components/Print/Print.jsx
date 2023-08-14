import styles from './Print.module.css'
import logo from '../../assets/logo_completa.png'

// Icons
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaMapMarkerAlt, FaFingerprint } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'

// Context
import { useStateContext } from '../../context/StateContext'

const Print = ({ id, email, displayName, name, address, phoneNumber, createdAt, finishedAt, devices }) => {
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
            <p><AiOutlineMessage /> {email}</p>
            <p><BsFillPersonCheckFill /> {displayName}</p>
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
          {devices && devices.map((device) => (
            <section  key={device.id}>
              <h3>Dispositivo: <span>{device.deviceType} {device.brand} {device.model}</span></h3>
              <hr />
              <h3>Defeito apresentado: <span>{device.problemDesc}</span></h3>
              <hr />
              <h3>Laudo técnico: <span>{device.technicalReport}</span></h3>
              <hr />
              {device.parts && (
                <table>
                  <thead>
                    <tr>
                      <th className='prod_serv'>Produtos</th>
                      <th className='qtd'>Qtd</th>
                      <th>V. UN R$</th>
                      <th>S. Total R$</th>
                    </tr>
                  </thead>
                  {device.parts.map((part, i) => (
                    <tbody key={i}>
                      <tr>
                        <td>{part.part}</td>
                        <td>1</td>
                        <td>R$ {part.price}</td>
                        <td>R$ {part.price}</td>
                      </tr>
                    </tbody>
                  ))}
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='totalText'>Total</td>
                      <td>{device.totalParts}</td>
                    </tr>
                  </tfoot>
                </table>
              )}
              
              <table>
                <thead>
                  <tr>
                    <th className='prod_serv'>Serviços</th>
                    <th className='qtd'>Qtd</th>
                    <th>V. UN R$</th>
                    <th>S. Total R$</th>
                  </tr>
                </thead>
                {device.services && device.services.map((service) => (
                  <tbody key={service.id}>
                    <tr>
                      <td>{service.service}</td>
                      <td>1</td>
                      <td>R$ {service.price}</td>
                      <td>R$ {service.price}</td>
                    </tr>
                  </tbody>
                ))}
                {/* Final de loop */}
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className='totalText'>Total</td>
                    <td>R$ {device.totalServices}</td>
                  </tr>
                </tfoot>
              </table>
              <h3 className='total'>Valor Total da OS: R$:{device.total}</h3>
            </section>
          ))}
        </main>
        <footer>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Assinatura do Cliente</th>
                <th>Assinatura do Tecnico Responsável</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='date'> </td>
                <td className='signature'> . </td>
                <td className='signature'> . </td>
              </tr>
            </tbody>
          </table>
        </footer>
      </div>
    </div>
  )
}

export default Print