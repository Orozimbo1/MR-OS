import styles from './Message.module.css'

const Message = ({msg, type}) => {
  return (
    <div className={`${styles.message} ${type == 'error' ? styles.error : styles.success}`}>
      <h5>{msg}</h5>
    </div>
  )
}

export default Message