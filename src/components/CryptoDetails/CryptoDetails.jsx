import './CryptoDetails.css';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';
import {Loader} from '../index';

const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
const { Option } = Select;

// const coinMock = {
//   "coin": {
//       "uuid": "HIVsRcGKkPFtW",
//       "symbol": "USDT",
//       "name": "Tether USD",
//       "description": "Tether (USDT) is a stablecoin that uses blockchain technology to peg its USDT tokens to the US dollar, bridging the gap between fiat and crypto.",
//       "color": "#22a079",
//       "iconUrl": "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg",
//       "websiteUrl": "https://tether.to/",
//       "links": [
//           {
//               "name": "tether.to",
//               "url": "https://tether.to/",
//               "type": "website"
//           },
//           {
//               "name": "Facebook",
//               "url": "https://www.facebook.com/tether.to",
//               "type": "facebook"
//           },
//           {
//               "name": "www.linkedin.com",
//               "url": "https://www.linkedin.com/company/tether",
//               "type": "linkedin"
//           },
//           {
//               "name": "r/tether",
//               "url": "https://www.reddit.com/r/tether/",
//               "type": "reddit"
//           },
//           {
//               "name": "tether_to",
//               "url": "https://twitter.com/tether_to",
//               "type": "twitter"
//           }
//       ],
//       "supply": {
//           "confirmed": true,
//           "supplyAt": 1669711320,
//           "max": null,
//           "total": null,
//           "circulating": "65362681003.31587"
//       },
//       "numberOfMarkets": 16190,
//       "numberOfExchanges": 127,
//       "24hVolume": "37597587614",
//       "marketCap": "65401217494",
//       "fullyDilutedMarketCap": "65401217494",
//       "price": "1.000589579404826",
//       "btcPrice": "0.000044673216152139",
//       "priceAt": 1677829380,
//       "change": "-0.14",
//       "rank": 3,
//       "sparkline": [
//           "1.001818084251763",
//           "1.0006739243330396",
//           "1.0015744071524002",
//           "1.0015872323144175",
//           "1.0012285840599215",
//           "1.0015285319917613",
//           "1.002222382180302",
//           "1.0011565654444552",
//           "1.001140399049049",
//           "1.0019387296987061",
//           "1.0010941147691392",
//           "0.9986616963805632",
//           "0.9993439412193141",
//           "1.0002522816411865",
//           "1.0008002429810579",
//           "1.000239155822992",
//           "1.000928462701729",
//           "1.0013967103687327",
//           "1.0146951305408616",
//           "1.0110033381139583",
//           "1.006229630800201",
//           "1.0034215948212748",
//           "1.0019020127339802",
//           "1.0013923258054256",
//           "1.0012768672307606"
//       ],
//       "allTimeHigh": {
//           "price": "2.00000000065111",
//           "timestamp": 1469145600
//       },
//       "coinrankingUrl": "https://coinranking.com/coin/HIVsRcGKkPFtW+tetherusd-usdt",
//       "tier": 1,
//       "lowVolume": false,
//       "listedAt": 1420761600,
//       "hasContent": true,
//       "notices": null,
//       "tags": [
//           "stablecoin"
//       ]
//   }
// }
// const coin = coinMock.coin;





const CryptoDetails = () => {
  const { coinId } = useParams();
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
  const [timePeriod, setTimePeriod] = useState('7d');
  // const coin = coinMock.coin;
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
      {/* Line chart */}

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