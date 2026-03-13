import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const PriceChart = () => {
  const months = ['03 Mar', '04 Mar', '05 Mar', '06 Mar', '07 Mar', '08 Mar', '09 Mar', 'Today', '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar', '17 Mar']
  
  const historicalData = [2500, 2480, 2550, 2490, 2530, 2520, 2470, null, null, null, null, null, null, null, null]
  const predictedData = [null, null, null, null, null, null, null, 2545, 2520, 2560, 2540, 2530, 2550, 2560, 2540]

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Historical',
        data: historicalData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#3b82f6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
      },
      {
        label: 'Predicted',
        data: predictedData,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 3,
        borderDash: [10, 5],
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#f97316',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#f97316',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
        spanGaps: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        titleColor: '#111827',
        bodyColor: '#3b82f6',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 16,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 16,
          weight: 'bold' as const,
        },
        callbacks: {
          title: function(context: any) {
            return context[0].label
          },
          label: function(context: any) {
            return 'Price : ₹' + context.parsed.y
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 2600,
        ticks: {
          color: '#9ca3af',
          callback: function(value: any) {
            return '₹' + value
          },
          stepSize: 650,
        },
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        }
      },
      x: {
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          }
        },
        grid: {
          display: false,
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    hover: {
      mode: 'index' as const,
      intersect: false,
    }
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-6 border border-gray-200 dark:border-dark-border transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm">Historical vs AI-Predicted Prices (₹/quintal)</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-dashed border-orange-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Predicted</span>
          </div>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  )
}

export default PriceChart
