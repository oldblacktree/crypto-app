import './News.css';
import moment from 'moment/moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { Card } from 'antd';
import Loader from '../Loader/Loader';

const News = ({short}) => {
  const {data, isFetching} = useGetCryptoNewsQuery(short ? 10 : 100);


  if (isFetching) return <Loader />;

  return (
    <div className="news">
      <div className="news-card-wrapper">
        {data?.map((news, i) => (
          <Card hoverable className='news-card'
            title={news.title.length > 100 ? `${news.title.substring(0, 100)}...` : news.title}
            bordered={false}
            key={i}
            extra={ <a href={news.url} target="_blank"
            className='link'>
              more
            </a>}>
            <p className="news-card__description">{news.description.length > 200 ? `${news.description.substring(0, 200)}...` : news.description}</p>
            <p className="news-card__date">
            {moment(news.date).startOf('hour').fromNow()}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default News;