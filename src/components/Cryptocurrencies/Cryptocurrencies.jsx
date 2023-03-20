import { Card, Input } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../Loader/Loader";
import "./Cryptocurrencies.css";

const Cryptocurrencies = ({ short }) => {
  const count = short ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData);
  }, [data, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <div className="cryptocurrencies">
      {!short && (
        <div className="cryptocurrencies__search">
          <Input
            placeholder="Search cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      )}

      <div className="cryptocurrencies__list">
        {cryptos?.map((coin) => (
          <Link to={`/crypto/${coin.uuid}`} key={coin.uuid}>
            <Card
              title={
                coin.name.length < 20
                  ? `${coin.rank} ${coin.name}`
                  : `${coin.rank} ${coin.name.slice(0, 17)}...`
              }
              extra={<img className="cryptocard__logo" src={coin.iconUrl} />}
              hoverable
              className="paragraph"
            >
              <p>Price: {millify(coin.price)}</p>
              <p>Market Cap: {millify(coin.marketCap)}</p>
              <p>Daily Change: {coin.change}%</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
