import './CardOrderService.css'
import React from 'react'

import { Link } from 'react-router-dom'

const CardOrderService = ({ name, address, phoneNumber, createdAt, id }) => {
  const date = createdAt.toDate().toDateString()

  return (
    <div >
      <Link to={`/order-service/${id}`} className='card-order-service'>
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