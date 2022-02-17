import React, { useContext } from 'react';
import { CustomBtn } from '.';
import { MarketPlaceContext } from "../context/MarketContext";

const ConnectWallect = () => {
  const { ConnectWalletBtn } = useContext(MarketPlaceContext);

  return (
    <div className="cursor-pointer p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
    <p className='text-center text-white'>Your wallet is not connected for minting, listing, selling and buying NFTs</p>
      <div className="h-[1px] w-full bg-gray-400 my-10" />
      <CustomBtn 
      callback={() => ConnectWalletBtn() } 
      title="Connect Wallet" />

    </div>
  );
};

export default ConnectWallect;
