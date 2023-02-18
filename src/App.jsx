import { Cryptocurrencies, CryptoDetails, Exchanges, Homepage, Navbar, News } from "./components";
import './App.css';
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route path="/news" element={<News />} />
      </Routes>
      </main>
    </div>
  );
};

export default App;
