import React from 'react'
import { format } from 'date-fns'

function DeviceData() {
  return (
    <div>
        <form action="">
            <label htmlFor="nome">Nome do dispositivo:</label>
            <input type="text" />
            <label htmlFor="nome">Tipo do dispositvo:</label>
            <input type="text" />
            <label htmlFor="nome">Modelo:</label>
            <input type="text" />
            <label htmlFor="nome">Cor:</label>
            <input type="text" />
            <label htmlFor="nome">Data:</label>
            format(new Date(), 'dd/mm/yyyy')
        </form>
    </div>
  )
}

export default DeviceData