import React from 'react';
import { Navbar, ActivitiesBoard, Footer } from '../components';

const Activities = () => {
  return (
    <>
    <div className="gradient-bg-welcome min-h-[900px]">
      <Navbar navLinks={["Collected NFTs", "Sell NFTs", "Activities"]}/>
        <ActivitiesBoard />
    </div>
    <Footer />
   </>
  );
};

export default Activities;
