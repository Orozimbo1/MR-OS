import React from 'react'
import { format } from 'date-fns'
import './Device.css'

function DeviceData() {
  return (
    <div id='dados'>
        <form action="">
            <label>
              <span>Nome do dispositivo:</span>
              <input type="text" />
            </label>
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
            {/* <label>
                  <span>Data:</span>
                  format(new Date(), 'dd/mm/yyyy')
                </label> 
             */}
            <label>
              <span>Descrição do problema:</span>
              <textarea id="w3review" name="w3review" rows="15" cols="50">
              </textarea>
            </label>
        </form>
        <div id='botoes'>
          <input type="submit" value="Adicionar outro aparelho" className='add' />
          <input type="submit" value="Finalizar" className='finalizar' />
        </div>
    </div>
  )
}

export default DeviceData