import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const OrderPDF = async (order, user) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const parts =  order.device.parts.map((part) => {
    console.log(part)
    return [
      [{text: part.part}, {text: part.price}],
    ]
  })

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [14, 50, 15, 40],

    header: [
      {
        text: user,
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
          parts.length > 0 && {
            style: 'tableExample',
            headerRows: 1,
            widths: [200, '*'],
            table: {
              body: [
                [
                  {text: 'Peça', style: 'tableHeader', bold: true}, 
                  {text: 'Valor', style: 'tableHeader', bold: true}
                ],
                ...parts
              ]
            }
          },
          {
            text: `Descrição do problema: ${device.problemDesc}`,
            fontSize: 12,
            margin: [ 0, 5 ],
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

  // console.log('ola')
  // return (
  //   <div>PDFGenerator</div>
  // )
}

export default OrderPDF