import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom' ;
import { Button } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuFoldOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import './Navbar.css';
import assets from '../../assets';


const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    console.log('heraef')
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  },[])

  useEffect(() => {
    if (screenSize < 992) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  },[screenSize])

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={assets.logo} alt="logo" className='navbar__logo-img'/>
        <Link to={'/'}>
          <h1 className="navbar__logo">Cryptoverse</h1>
        </Link>
      </div>
      <Button className='navbar__menu-button' type="text" size="large" onClick={() => setActiveMenu((prev) => !prev)}>
        {activeMenu ? <CloseOutlined /> : <MenuOutlined />}
      </Button>
      {activeMenu && <nav className="nav">
          <ul className='nav__list'>
            <li className='nav__item'>
              <Link to={'/'}>
                <HomeOutlined />
                <span className='nav__item-label'>Home</span>
              </Link>
            </li>
            <li className='nav__item'>
              <Link to={'/cryptocurrencies'}>
                <FundOutlined />
                <span className='nav__item-label'>Cryptocurrencies</span>
              </Link>
            </li>
            <li className='nav__item'>
              <Link to={'/exchanges'}>
                <MoneyCollectOutlined />
                <span className='nav__item-label'>Exchanges</span>
              </Link>
            </li>
            <li className='nav__item'>
              <Link to={'/news'}>
                <BulbOutlined />
                <span className='nav__item-label'>News</span>
              </Link>
            </li>
          </ul>
      </nav>}
    </div>
  );
};

export default Navbar;