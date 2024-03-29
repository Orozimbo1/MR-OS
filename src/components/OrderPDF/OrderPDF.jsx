import pdfFonts from "./vfs_fonts"
import * as  pdfMake from "pdfmake/build/pdfmake"
pdfMake.vfs = pdfFonts

const OrderPDF = async (order, displayName, logo) => {
  console.log(logo)

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [14, 50, 15, 40],

    info: {
      title: 'awesome Document',
      author: 'john doe'
    },
    watermark: { text: displayName, color: 'blue', opacity: 0.3, bold: true, italics: false },
    header: [
      {
        text: displayName,
        fontSize: 15,
        margin: [ 20, 20, 0, 40 ],
        bold: true,
        alignment: 'left'
      }
    ],
    content: [
      {
        text: order.name,
        fontSize: 25,
        margin: [ 0, 5 ],
        alignment: 'center'
      },
      // Imagem
      {
        image: logo,
      },
      {
        text: order.phoneNumber,
        fontSize: 12,
        margin: [ 0, 5 ],
        alignment: 'center'
      },
      {
        text: order.address,
        fontSize: 12,
        margin: [ 0, 5, 0, 50 ],
        alignment: 'center'
      },
      order.devices.map((device) => {
        return [
          {
            columns: [
              {
                width: '*',
                text: `Tipo do dispositivo: ${device.deviceType}`,
                margin: [ 0, 5 ],
              },
              {
                width: '*',
                text: `Marca: ${device.brand}`,
                margin: [ 0, 5 ],
              }
            ],
          },
          {
            columns: [
              {
                width: '*',
                text: `Modelo: ${device.model}`,
                margin: [ 0, 5 ],
              },
              {
                width: '*',
                text: `Cor: ${device.color}`,
                margin: [ 0, 5 ],
              }
            ],
          },
          {text: 'Peças', fontSize: 15, bold: true, margin: [ 0, 15, 0, 10 ]},          
          device.parts && device.parts.map((part, i) => {
          return {text: `${i + 1}-  ${part.part}  -  R$: ${part.price}`, margin: [0, 5]}
          }),
          {
            text: `Descrição do problema: ${device.problemDesc}`,
            fontSize: 12,
            margin: [ 0, 15, 0, 5 ],
          },
          {
            text: `Mão de obra: R$: ${device.labor}`,
            fontSize: 12,
            margin: [ 0, 5 ],
          },
          {
            text: `R$: ${device.total}`,
            fontSize: 12,
            margin: [ 0, 5, 20, 20 ],
            bold: true,
            alignment: 'right'
          }
        ]
      }),
      {
        text: `R$: ${order.total}`,
        fontSize: 20,
        margin: [ 0, 5 ],
        alignment: 'right'
      }
    ],
    footer: function(currentPage, pageCount) { 
      return [
        {
          text: currentPage.toString() + ' / ' + pageCount,
          alignment: 'right',
          fontSize: 9,
          margin: [0, 10, 20, 0]
        }
      ]; 
    }
  }
  
  pdfMake.createPdf(docDefinitions).download()
}

export default OrderPDF