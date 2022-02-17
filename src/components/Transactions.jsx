import React, { useContext } from "react";

// import { TransactionContext } from "../context/TransactionContext";

//import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import { LikeBtn, ModalView } from ".";
import { MarketPlaceContext } from "../context/MarketContext";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 flex flex-col justify-center items-start text-sm font-light text-white";

const boxColors = ['box1-grad', 'box2-grad', 'box3-grad']

const TransactionsCard = ({ handleNftClick, description, image, name, owner, price, seller, itemId}) => {

  let bgColorGd = boxColors[Math.floor(Math.random() * boxColors.length)]

  const nft = {description, image, name, owner, price, seller, itemId};

  return (
    <div onClick={() => handleNftClick(nft)} className="m-4 flex flex-1
    2xl:min-w-[300px]
    2xl:max-w-[300px]
    sm:min-w-[250px]
    sm:max-w-[250px]
    min-h-[400px]
    max-h-[400px]
    min-w-full
    relative
    flex-col rounded-md hover:shadow-2xl clip-box cursor-pointer" 
    style={{backgroundImage: `url(${image})`, backgroundPosition: "center", backgroundSize: "cover"}}>
      <div className={`
      2xl:min-w-[300px]
      2xl:max-w-[300px]
      sm:min-w-[250px]
      sm:max-w-[250px]
      min-w-full
      min-h-[172px]
      max-h-[172px]
      rounded-br-lg
      rounded-bl-lg
      relative flex pt-5 pl-5 pr-5 pb-5 flex-col items-center ${bgColorGd}`} style={{top: "230px"}}>
        <div className="display-flex justify-start w-full mb-6 p-2">
          <p className="text-xs font-semibold text-custom-gray">{name}</p>
          <p className="text-lg font-semibold pt-4 text-white">{description}</p>
          <div className="flex flex-row justify-between max-w-[240px]">
          <div className={`${companyCommonStyles}`}>
              <span className="text-xs">Current Price</span> <span className="text-lg font-semibold">{price} ETH</span>
            </div>
            <div className={`${companyCommonStyles}`}>
              <span className="text-xs">Listed</span> <span className="text-lg font-semibold">Today</span>
            </div>
          </div>
        </div>
      </div>
      <LikeBtn isLiked totalLike="25" bg={bgColorGd}/>
    </div>
  );
};

const Transactions = () => {
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
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        { nfts.length !== 0 ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest NFTs
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Mint your NFTs to get added to the marketplace
          </h3>
        )}

        <ModalView {...modal}/>

        <div className="flex flex-wrap justify-center items-center mt-10">
          { nfts.length !== 0 ? [...nfts].reverse().map((transaction, i) => (
            <TransactionsCard handleNftClick={(nft) => handleModalSwitch(nft)} key={transaction.itemId} {...transaction} />
          )) : " "}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
