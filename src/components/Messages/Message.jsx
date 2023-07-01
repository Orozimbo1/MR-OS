import './Message.css'

const Message = ({msg, type}) => {
  return (
    <div className={`message ${type}`}>
      <h5>{msg}</h5>
    </div>
  )
}

export default Message