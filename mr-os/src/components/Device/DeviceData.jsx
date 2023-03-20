import React from 'react'
import { format } from 'date-fns'
import './Device.css'

function DeviceData() {
  return (
    <div>
        <form id='dados'>
          <div className="tec-data">
            <label>
              <span>Tipo do dispositvo:</span>
              <input type="text" />
            </label>
            <label>
              <span>Modelo:</span>
              <input type="text" />
            </label>
            <label>
              <span>Cor:</span>
              <input type="text" />
            </label>
          </div>
          {/* <label>
                <span>Data:</span>
                format(new Date(), 'dd/mm/yyyy')
              </label> 
            */}
          <label>
            <span>Descrição do problema:</span>
            <textarea>
            </textarea>
          </label>
        </form>
    </div>
  )
}

export default DeviceData