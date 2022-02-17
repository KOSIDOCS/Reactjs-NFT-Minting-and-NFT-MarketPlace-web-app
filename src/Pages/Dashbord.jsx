import React from 'react';
import { Navbar, FeaturedArtists, MarketNfts, DashboardCollected, Footer } from '../components';

const Dashbord = () => {
  return (
    <>
    <div className="gradient-bg-welcome min-h-[900px]">
      <Navbar navLinks={["Collected NFTs", "Sell NFTs", "Activities"]}/>
      <DashboardCollected />
    </div>
    <Footer />
   </>
  );
};

export default Dashbord;