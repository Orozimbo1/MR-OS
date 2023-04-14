import './CardOrderService.css'
import React from 'react'

import { Link } from 'react-router-dom'

const CardOrderService = ({ name, address, phoneNumber, createdAt, id }) => {
  const date = createdAt && createdAt.toDate() && createdAt.toDate().toLocaleString('pt-BR', { timezone: 'UTC' })

  return (
    <div className='card-order-service'>
      <Link to={`/order-service/${id}`}>
        <div>
          <h3>{name}</h3>
          <p>{address}</p>
        </div>
        <div>
          <p>{phoneNumber}</p>
          <p className='date'>{date}</p>
        </div>
      </Link>
    </div>
  )
}

export default CardOrderService