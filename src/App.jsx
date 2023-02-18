import { Cryptocurrencies, CryptoDetails, Exchanges, Homepage, Navbar, News } from "./components";
import './App.css';
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/crypto/:coinId" element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <footer className="app__footer">
          <p className="app__footer-info">
            Copyright © 2023 Cryptoverse Inc. <br />
            Not All Rights Reserved
          </p>
      </footer>
      </main>
    </div>
  );
};

export default App;
