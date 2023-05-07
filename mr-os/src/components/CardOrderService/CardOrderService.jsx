import './CardOrderService.css'
import React from 'react'

import { Link } from 'react-router-dom'

const CardOrderService = ({ name, address, phoneNumber, createdAt, id, devices, status }) => {
  const date = createdAt && createdAt.toDate() && createdAt.toDate().toLocaleString('pt-BR', { timezone: 'UTC' })

  return (
    <div className='card-order-service-container'>
      <Link to={`/order-service/${id}`}>
        <div className='card-order-service'>
          <div className={`qtd ${status}`}>{devices.length}</div>
          <div>
            <h3>{name}</h3>
            <p>{address}</p>
          </div>
          <div>
            <p>{phoneNumber}</p>
            <p className='date'>{date}</p>
          </div>
          <div className="total">
              <h4>Total</h4>
              <p><span>R$:</span> {devices.reduce((acc, val) => acc + val.total, 0)}</p>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default CardOrderService