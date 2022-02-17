import React, { useContext, useState } from "react";
import {
  Navbar,
  DashboardCollected,
  CustomBtn,
  ConnectWallect,
  Footer,
} from "../components";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { MarketPlaceContext } from "../context/MarketContext";
import { useNavigate } from "react-router-dom";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { shortenAddress } from "../utils/shortenAddress";

import {
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFTMarket_CONTRACT_ADDRESS,
  NFTMarket_CONTRACT_ABI,
} from "../utils/constants";

const SellNfts = () => {
  const { choosenProvider, isWalletConnected } = useContext(MarketPlaceContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
  const navigate = useNavigate();

  const onChange = async (e) => {
    const file = e.target.files[0];

    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  const createSale = async (url) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    console.log(tx);
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(NFTMarket_CONTRACT_ADDRESS, NFTMarket_CONTRACT_ABI, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(NFT_CONTRACT_ADDRESS, tokenId, price, { value: listingPrice })
    await transaction.wait()
    navigate("/");
  };

  return (
    <>
      <div className="gradient-bg-welcome min-h-[900px]">
        <Navbar navLinks={["Collected NFTs", "Sell NFTs", "Activities"]} />
        <div className="flex flex-col items-center justify-center w-full">
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
                  {choosenProvider && shortenAddress(choosenProvider?.selectedAddress)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
              </div>
            </div>
            {(choosenProvider === null) & (isWalletConnected !== true) && (
              <ConnectWallect />
            )}
          </div>

          <div className="flex justify-center w-full">
            <div className="w-1/2 flex flex-col pb-12">
              <div className="rounded mt-8 caret-pink-500 text-white bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
                <input
                  placeholder="Asset Name"
                  className="border w-full bg-[#282C49] rounded p-4"
                  onChange={(e) =>
                    setFormInput({ ...formInput, name: e.target.value })
                  }
                />
              </div>

              <div className="rounded mt-8 caret-pink-500 text-white bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
                <textarea
                  placeholder="Asset Description"
                  className="border w-full bg-[#282C49] rounded p-4"
                  onChange={(e) =>
                    setFormInput({ ...formInput, description: e.target.value })
                  }
                />
              </div>

              <div className="rounded mt-8 caret-pink-500 text-white bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
                <input
                  placeholder="Asset Price in Eth"
                  className="border w-full bg-[#282C49] rounded p-4"
                  onChange={(e) =>
                    setFormInput({ ...formInput, price: e.target.value })
                  }
                />
              </div>

              {/* <div className="rounded mt-8 caret-pink-500 text-white bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
        <input
          type="file"
          name="Asset"
          className="my-4"
        onChange={onChange}
        />
        </div> */}

              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  name="Asset"
                  className="my-4 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] file:text-[#282C49]
      hover:file:bg-violet-100
      cursor-pointer
      "
                  onChange={onChange}
                />
              </label>

              {fileUrl && (
                <img className="rounded mt-4" width="350" src={fileUrl} />
              )}
              <button
                onClick={createMarket}
                className="font-bold mt-4 btn-gradient text-white rounded p-4 shadow-lg"
              >
                Create Digital Asset
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellNfts;
