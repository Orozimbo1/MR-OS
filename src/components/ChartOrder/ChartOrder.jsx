import Chart from 'react-apexcharts'

import styles from './ChartOrder.module.css'

const ChartOrder = () => {

      const series = [44, 55, 41]
      const options = {
        labels : ['Andamento', 'Rejeitadas', 'Concluídas'],
        fill: {
          colors: ['#0051ff', '#F44336', '#01fc01']
        } 
      }

  return (
    <div className="donut">
        <Chart 
          options={options} 
          series={series} 
          type="donut" 
          width="380" 
        />
    </div>
  );
}

export default ChartOrder