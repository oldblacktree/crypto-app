import {
  Cryptocurrencies,
  CryptoDetails,
  Homepage,
  Navbar,
  News,
} from "./components";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <div className="app__main-info">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
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
