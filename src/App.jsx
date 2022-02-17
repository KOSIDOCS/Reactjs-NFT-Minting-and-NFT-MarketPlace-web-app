import { Navbar, Welcome, Footer, Transactions } from "./components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, MarketPlace, Dashbord, SellNfts, Activities } from "./Pages";

const App = () => (
  <div className="min-h-screen">
            <BrowserRouter>
              <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Marketplace" element={<MarketPlace />}/>
              <Route path="/Dashbord" element={<Dashbord />} />
              <Route path="/CollectedNFTs" element={<Dashbord />} />
              <Route path="/SellNFTs" element={<SellNfts />} />
              <Route path="/Activities" element={<Activities />} />
              </Routes>
            </BrowserRouter>
  </div>
);

export default App;
