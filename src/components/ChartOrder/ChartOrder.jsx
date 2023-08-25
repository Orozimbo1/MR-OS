import Chart from 'react-apexcharts'

import styles from './ChartOrder.module.css'

const ChartOrder = () => {

      const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        },
        fill: {
          colors: ['#F44336', '#01fc01', '#0051ff']
        } 
      }

      const coast = [30, 40, 45, 50, 49, 60, 70, 91, 78, 12, 56, 42]
      const rend = [10, 20, 25, 30, 29, 50, 60, 81, 58, 2, 36, 22]
      // const total = [40, 20, 25, 30, 29, 50, 60, 81, 58, 2, 36, 22]

      const series = [
        {
          name: "Gastos",
          data: options.xaxis.categories.map((el, i) => coast[i])
        },
        {
          name: "Lucro",
          data: options.xaxis.categories.map((el, i) => rend[i])
        },
        {
          name: "Total",
          data: options.xaxis.categories.map((el, i) => rend[i] + coast[i]),
          
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

export default ChartOrder