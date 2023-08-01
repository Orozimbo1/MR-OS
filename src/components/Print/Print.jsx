import styles from './Print.module.css'
import logo from '../../assets/logo_completa.png'

// Context
import { useStateContext } from '../../context/StateContext'

const Print = () => {
  const { setShowPrint } = useStateContext()

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
          </section>
          <section className={styles.id}>
            <p>ola</p>
          </section>
        </header>
        <hr />
      </div>
    </div>
  )
}

export default Print