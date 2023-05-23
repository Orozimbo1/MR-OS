import ApexChart from 'react-apexcharts';

export const OrderChart = () => {

    const options = {
        xaxis: {
            type:'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
    }

    const series = [{
        data:[]
    }]

  return (
    <div>
        <ApexChart
            options={options}
            series={series}
            type='candlestick'
        />
    </div>
  )
}
