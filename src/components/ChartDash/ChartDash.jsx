import Chart from 'react-apexcharts'

// import './Chart.module.css'

const ChartDash = () => {

      const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        }
      }
      const series = [
        {
          name: "Gastos",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 78, 12, 56, 42]
        },
        {
          name: "Lucro",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 78, 12, 56, 42]
        },
        {
          name: "Total",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 78, 12, 56, 42]
        }
      ]

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="900"
          />
        </div>
      </div>
    </div>
  );
}

export default ChartDash