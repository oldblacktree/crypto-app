import './Homepage.css';
import millify from 'millify';
import { Link } from 'react-router-dom'; 
import { useGetCryptosQuery } from '../../services/cryptoApi';
import {Cryptocurrencies, News} from '../index';

const StatsItem = ({title, value}) => (
  <div className="stats-item">
    <p className="stats-item__title">{title}</p>
    <p className="stats-item__value">{value}</p>
  </div>
)

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats || {};


  return (
    <div className="homepage">
      <div className="section-title-wrapper">
        <h2 className="section-title">Global Crypto Stats</h2>
      </div>
      <div className="stats">
        <StatsItem title="Total Cryptocurrencies" value={millify(globalStats.total)}/>
        <StatsItem title="Total Exchanges" value={millify(globalStats.totalExchanges)}/>
        <StatsItem title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/>
        <StatsItem title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/>
        <StatsItem title="Total Markets" value={millify(globalStats.totalMarkets)}/>
      </div>
      <div className="section-title-wrapper">
        <h2 className="section-title">Top 10 Cryptos In The World</h2>
        <Link to="/cryptocurrencies" className='link'>Show more</Link>
      </div>
      <Cryptocurrencies short/>
      <div className="section-title-wrapper">
        <h2 className="section-title">Latest Crypto News</h2>
        <Link to="/news" className='link'>Show more</Link>
      </div>
      < News short/>
    </div>
  )
}

export default Homepage;