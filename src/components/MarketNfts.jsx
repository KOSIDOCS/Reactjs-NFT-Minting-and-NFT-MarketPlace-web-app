import React, { useContext } from "react";
import dummyArtists from "../utils/dummyArtists";
import { CustomBtn, ModalView } from ".";
import { MarketPlaceContext } from "../context/MarketContext";

const boxColors = ['box1-grad', 'box2-grad', 'box3-grad']

let bgColorGd = boxColors[Math.floor(Math.random() * boxColors.length)]

const MarketNftsCards = ({ handleNftClick, addressTo, addressFrom, timestamp, message, keyword, amount, url, userUrl, description, image, name, owner, price, seller, itemId }) => (
    <div onClick={() => handleNftClick({description, image, name, owner, price, seller, itemId})} className="m-4 flex flex-1
    2xl:min-w-[250px]
    2xl:max-w-[250px]
    sm:min-w-[200px]
    sm:max-w-[200px]
    min-h-[300px]
    max-h-[300px]
    min-w-full
    relative
    flex-col rounded-md hover:shadow-2xl clip-box cursor-pointer" 
    style={{backgroundImage: `url(${image})`, backgroundPosition: "center", backgroundSize: "cover"}}>
      <div className={`
      2xl:min-w-[250px]
      2xl:max-w-[250px]
      sm:min-w-[200px]
      sm:max-w-[200px]
      min-w-full
      min-h-[155px]
      max-h-[155px]
      rounded-br-lg
      rounded-bl-lg
      relative flex pt-5 pl-5 pr-5 pb-5 justify-center flex-col items-center ${bgColorGd}`} style={{top: "147px"}}>
        <div className="display-flex justify-center item-center w-full mb-6 mt-4">
          <p className="text-base font-semibold pt-4 text-white">{name}</p>
          <p className="text-xs font-bold text-[#535F73]">{description}</p>
          <p className="text-sm font-bold eth-price-gradient">{price} ETH</p>
            <CustomBtn title="Collect Now" isWidthFull my="my-2"/>
        </div>
      </div>
    </div>
);

const MarketNfts = ({ isLiked, totalLike, bg }) => {
  const { nfts } = useContext(MarketPlaceContext);
  const [modal, setModal] = React.useState({});

  const modalbg = document.getElementById('modal-bg');
  const modalBox = document.getElementById('modal-box');

  const handleModalSwitch = (nft) => {
    setModal(nft);
    modalBox.classList.remove('hidden')
    modalbg.classList.remove('hidden')
    console.log(nft);
  }

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20">
      <div className="flex flex-col md:p-4 py-4 px-4">
        <p className="text-white pl-6 text-2xl font-bold">All NFTs</p>
        <ModalView {...modal}/>
        {nfts.length !== 0 ? (<div className="flex flex-wrap justify-center items-center mt-4">
               {[...nfts].reverse().map((transaction, i) => (
           <MarketNftsCards handleNftClick={(nft) => handleModalSwitch(nft)} key={i} {...transaction} />
           ))}
        </div>) : (<h3 className="text-white text-3xl text-center my-2">
            Mint your NFTs to get added to the marketplace
          </h3>)}
      </div>
    </div>
  )};
export default MarketNfts;