import React from 'react'
import './LineChart.scss'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

interface Props {
    labels: string[],
    data: number[],
    title: string
}

export default function LineChart({labels, data, title}:Props) {
    let id:any = 1
  return (
    <div className="line-chart">
      <Line
            data={{
              labels: labels,
              datasets: [
                {
                //   id: 1,
                  label: "",
                  data: data,
                },

              ],
            }}
            options = {{
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: title
                    }
                },
                // scales: {
                //     yAxes: [{
                //         ticks: {
                            
                //         }
                //     }]
                // }
            }}
          />
    </div>
  )
}
