import './CryptoDetails.css';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';
import {Loader, CryptoHistory} from '../index';

const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
  const [timePeriod, setTimePeriod] = useState('7d');
  const coin = data?.data?.coin;

  const stats = [
    { title: 'Price to USD', value: `$ ${coin?.price && millify(coin?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coin?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${coin?.["24hVolume"] && millify(coin?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coin?.marketCap && millify(coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${coin?.allTimeHigh?.price && millify(coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];
  
  const genericStats = [
    { title: 'Number Of Markets', value: coin?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${coin?.supply?.total && millify(coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${coin?.supply?.circulating && millify(coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if (isFetching) return <Loader />;

  return (
    <div className="coin-details">
      <div className="coin-details__header">
        <h2 className="section-title">{coin?.name} ({coin?.symbol}) price</h2>
        <img src={coin?.iconUrl} alt="logo" className='coin-details__header-logo'/>
      </div>
      <p className="coin-details__title paragraph">{coin?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      <Select defaultValue="7d" className="coin-details__select" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <CryptoHistory timePeriod={timePeriod} coinId={coinId} coinName={coin?.name}/>
      <div className="coin-info">
        <div className="coin-info__item">
          <h3 className='coin-info__item-header section-title3'>{coin?.name} Value Statistics</h3>
          <div className="coin-info__stats">
            {stats.map((item) =>(
              <div className="coin-info__stats-item paragraph" key={item.title}>
                <p className="coin-info__stats-item-title">
                  <span className="coin-info__stats-ico">{item.icon}</span>
                  <span>{item.title}</span>
                </p>
                <span className='coin-info__stats-value'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="coin-info__item">
          <h3 className='coin-info__item-header section-title3'>Other Stats Info</h3>
          <div className="coin-info__stats">
            {genericStats.map((item) =>(
              <div className="coin-info__stats-item paragraph" key={item.title}>
                <p className="coin-info__stats-item-title">
                  <span className="coin-info__stats-ico">{item.icon}</span>
                  <span>{item.title}</span>
                </p>
                <span className='coin-info__stats-value'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="coin-info__item">
          <h3 className='coin-info__item-header section-title3'>What is {coin?.name}</h3>
          <p className='coin-info_item-description paragraph'>{coin?.description}</p>
        </div>
        <div className="coin-info__item">
          <h3 className='coin-info__item-header section-title3'>{coin?.name} links</h3>
          <div className="coin-info__stats">
            {coin?.links?.map((link) =>(
              <div className="coin-info__stats-item paragraph" key={link.name}>
                <p className="coin-info__stats-item-title">
                  <span>{link.type}</span>
                </p>
                <a href={link.url} className="link coin-info__stats-link" target='_blank'>{link.name}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default CryptoDetails;