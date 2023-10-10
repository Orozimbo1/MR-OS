import Chart from 'react-apexcharts'

import styles from './ChartDash.module.css'

const ChartDash = ({ orders, pending, rejected, finished }) => {
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const maisAntigo = orders.map(el => el.createdAt.toDate().getMonth()).sort((a, b) => a - b)
      const maisNovo = orders.map(el => el.createdAt.toDate().getMonth()).sort((a, b) => b - a)

      const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: months.slice(maisAntigo[0], maisNovo[0] + 1)
        }
      }
      // console.log(months.slice(7, 9))

      const coast = [50, 20, 45, 50, 49, 60, 70, 91, 78, 12, 56, 42].slice(0, (maisNovo[0] - maisAntigo[0]) + 1)
      const rend = [10, 20, 25, 30, 29, 50, 60, 81, 58, 2, 36, 22].slice(0, (maisNovo[0] - maisAntigo[0]) + 1)
      // const total = [40, 20, 25, 30, 29, 50, 60, 81, 58, 2, 36, 22]

      const series = [
        {
          name: "Gastos",
          data: options.xaxis.categories.map((el, i) => coast[i]),
          color: '#ff1100'
        },
        {
          name: "Lucro",
          data: options.xaxis.categories.map((el, i) => rend[i]),
          color: '#0051ff'
        },
        {
          name: "Total",
          data: options.xaxis.categories.map((el, i) => rend[i] + coast[i]),
          color: '#01fc01'  
        }
      ]

  return (
    <div className={styles.chart_container}>
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="line"
              width="100%"
              height="300%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartDash