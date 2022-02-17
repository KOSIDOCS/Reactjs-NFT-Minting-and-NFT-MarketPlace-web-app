import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Authereum from "authereum";

import {
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFTMarket_CONTRACT_ADDRESS,
  NFTMarket_CONTRACT_ABI,
} from "../utils/constants";

export const MarketPlaceContext = React.createContext();

const { ethereum } = window;

export const MarketsProvider = ({ children }) => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [choosenProvider, setChoosenProvider] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [nftsCollected, setNftsCollected] = useState([])
  const [sold, setSold] = useState([])
  const [nftsOwned, setNftsOwned] = useState([])

  const providerOptions = {
    /* See Provider Options Section */
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "3fd4907115b84c7eb48e95514768a4e8", // required
      },
    },
    authereum: {
      package: Authereum,
    },
  };

  const web3Modal = new Web3Modal({ providerOptions, theme: "dark" });
  
  /**
   * Load the NFTs from the blockchain for MarketPlace
   */
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider();
    await provider.ready;
    const tokenContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    );
    const marketContract = new ethers.Contract(
      NFTMarket_CONTRACT_ADDRESS,
      NFTMarket_CONTRACT_ABI,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    console.log(items);
    setLoadingState("loaded");
  }

  /**
   * Load the NFTs from the blockchain that you own or sold.
   */
  async function loadNFTsCollected() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(NFTMarket_CONTRACT_ADDRESS, NFTMarket_CONTRACT_ABI, signer)
    const tokenContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        isCollection: true,
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNftsCollected(items)
  }

  async function loadNFTsOwned() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(NFTMarket_CONTRACT_ADDRESS, NFTMarket_CONTRACT_ABI, signer)
    const tokenContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider)
    const data = await marketContract.fetchMyNFTs()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        isCollection: true,
      }
      return item
    }))
    setNftsOwned(items)
  }

  /**
   * Connect wallet button pressed.
   */
  async function ConnectWalletBtn() {
    console.log("Opening a dialog", web3Modal);
    try {
      const provider = await web3Modal.connect();
      await web3Modal.toggleModal();
      console.log("Connected to wallet", provider);
      setChoosenProvider(provider);
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }

    // Subscribe to accounts change
    // provider.on("accountsChanged", (accounts) => {
    //   fetchAccountData();
    // });

    // Subscribe to chainId change
    // provider.on("chainChanged", (chainId) => {
    //   fetchAccountData();
    // });

    // Subscribe to networkId change
    // provider.on("networkChanged", (networkId) => {
    //   fetchAccountData();
    // });

    // await refreshAccountData();
  }

  const checkIfWalletIsConnect = async () => {
      if (ethereum && choosenProvider) {
        setIsWalletConnected(true);
      }    
  };

  const buyNFTs = async (nft) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(NFTMarket_CONTRACT_ADDRESS, NFTMarket_CONTRACT_ABI, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(NFT_CONTRACT_ADDRESS, nft.itemId, {
      value: price
    })
    await transaction.wait()
    //loadNFTs()
    window.location.reload();
  }

  useEffect(() => {
    loadNFTs();
    checkIfWalletIsConnect();
    loadNFTsCollected();
    loadNFTsOwned();
  }, []);

  return (
    <MarketPlaceContext.Provider
      value={{
        nfts,
        loadingState,
        ConnectWalletBtn,
        choosenProvider,
        isWalletConnected,
        nftsCollected,
        sold,
        nftsOwned,
        buyNFTs,
      }}
    >
      {children}
    </MarketPlaceContext.Provider>
  );
};
