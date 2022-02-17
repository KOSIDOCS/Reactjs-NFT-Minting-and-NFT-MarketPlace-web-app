import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';

import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import { CustomBtn, ConnectWallect } from ".";
import { MarketPlaceContext } from "../context/MarketContext";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex flex-col justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { choosenProvider } = useContext(MarketPlaceContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Discover Rare <br /> Collection of <br /> Art & NFTs
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            NFTKRYPT is the premier marketplace for rare art and NFTs, which are digital items you can truly own. Digital items have existed for a long time, but never like this.
          </p>

          <Link to="/Marketplace"><CustomBtn title="Start Collecting" isIcon /></Link>

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-xl rounded-bl-xl ${companyCommonStyles}`}>
              <span className="text-lg font-semibold">78k</span> <span className="text-xs">Active Users</span>
            </div>
            <div className={companyCommonStyles}>
            <span className="text-lg font-semibold">17K</span> <span className="text-xs">Artworks</span>
            </div>
            <div className={`sm:rounded-tr-xl sm:rounded-br-xl ${companyCommonStyles}`}>
              <span className="text-lg font-semibold">2.5k</span> <span className="text-xs">Artists</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {choosenProvider && shortenAddress(choosenProvider.selectedAddress)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          {/* <ConnectWallect /> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
