import { useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import './CryptoHistory.css';
import {Loader} from '../index';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const CryptoHistory = ({timePeriod, coinId, coinName}) => {
  const {data, isFetching} = useGetCryptoHistoryQuery({coinId, timePeriod});

  if (isFetching) return <Loader />;

  const history = data?.data?.history ? [...data?.data?.history].reverse() : [];
  const change = data?.data?.change;

  const labels = history?.map((item) => {
    const date = new Date(item.timestamp * 1000)
    switch(timePeriod) {
        case '3h':
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        case '24h':
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        case '7d':
            return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
        case '30d':
            return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
        case '3m':
            return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
        case '1y':
            return date.toLocaleDateString([], { year: '2-digit', month: '2-digit' })
        case '3y':
            return date.toLocaleDateString([], { year: '2-digit', month: '2-digit' })
        case '5y':
            return date.toLocaleDateString([], { year: '2-digit', month: '2-digit' })
      }
});

  const chartData = {
      labels,
      datasets: [
        {
          label: 'Price In USD',
          data: history?.map((item) => item.price),
          borderColor: '#0071bd',
          backgroundColor: "#F0F2F5",
        },
      ],
    };

  return (
    <div className="crypto-history">
        <div className="crypto-history__title">
            <h3 className='section-title3'>{coinName} Price Chart </h3>
            <p className="crypto-history__title-info paragraph">
                Change: <span className={`crypto-history__title-change--${change > 0 ? 'up' : 'down'}`}>{change}</span> %
            </p>
        </div>
        <Line data={chartData}></Line>
    </div>
  );
}

export default CryptoHistory;
