import './CardOrderService.css'
import React from 'react'

import { Timestamp } from 'firebase/firestore';

const CardOrderService = ({ name, address, createdBy, phoneNumber, userId, createdAt }) => {
  const date = createdAt.toDate().toDateString()

  return (
    <div className='card-order-service'>
      <br />
      <p>Nome: {name}</p>
      <p>Endereço: {address}</p>
      <p>Telefone: {phoneNumber}</p>
      <p>Id do usuário: {userId}</p>
      <p>Criado por: {createdBy}</p>
      <p>Criado em: {date}</p>
      <br />
      <hr />
    </div>
  )
}

export default CardOrderService