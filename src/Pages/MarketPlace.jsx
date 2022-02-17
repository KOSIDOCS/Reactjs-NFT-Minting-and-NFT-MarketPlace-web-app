import React from 'react';
import { Navbar, FeaturedArtists, MarketNfts, Footer } from '../components';

const MarketPlace = () => (
    <>
      <div className="gradient-bg-welcome min-h-[900px]">
        <Navbar />
        <FeaturedArtists />
        <MarketNfts />
      </div>
      <Footer />
  </>
);

export default MarketPlace;
