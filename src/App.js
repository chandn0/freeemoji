import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import ReactDOM from "react-dom/client";
import { HashRouter, Route } from 'react-router-dom';
import {
  BrowserRouter,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <HashRouter>
        <Route path="/" component={<Marketplace />} />
        <Route path="/nftPage" component={<NFTPage />} />
        <Route path="/profile" component={<Profile />} />
        <Route path="/sellNFT" component={<SellNFT />} />
      </HashRouter>
    </div>
  );
}

export default App;
