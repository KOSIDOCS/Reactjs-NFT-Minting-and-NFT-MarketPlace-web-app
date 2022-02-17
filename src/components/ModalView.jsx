import { useContext } from 'react';
import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { CustomBtn } from '.';
import { MarketPlaceContext } from "../context/MarketContext";

const ModalView = ({description, image, name, owner, price, seller, itemId, isCollection}) => {
  const { buyNFTs } = useContext(MarketPlaceContext);
    const modalbg = document.getElementById('modal-bg');
    const modalBox = document.getElementById('modal-box');

    const handleModalBgClick = () => {
        modalBox.classList.add('hidden')
        modalbg.classList.add('hidden')
    }

    const handleModalCloseClick = (e) => {
        modalBox.classList.remove('hidden')
        modalbg.classList.remove('hidden')
        console.log(e.target);
    }

    const CurrentNft = {description, image, name, owner, price, seller, itemId};

  return (
<div id="modal-bg" className='z-50'>
  <div id="modal-box" style={{backgroundImage: `url(${image})`, backgroundPosition: "center", backgroundSize: "cover"}} className="sm:w-[385px] sm:min-w-[40vw] bg-[#000] min-w-[80vw] min-h-[50vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute hidden">
  <div style={{position: "relative", right: "215px", top: "-20px"}} className='z-50 cursor-pointer' onClick={handleModalBgClick}> <AiFillCloseCircle fontSize={32}/> </div>
    <div style={{position: "relative", top: "230px"}}>
    <p className="text-base font-semibold pt-4 eth-price-gradient">{name}</p>
          <p className="text-xs font-bold text-[#535F73]">{description}</p>
          <p className="text-sm font-bold eth-price-gradient">{price} ETH</p>
           {isCollection !== true && <CustomBtn callback={() => buyNFTs(CurrentNft)} title="Collect Now" isWidthFull my="my-2"/> }
    </div>
  </div>
</div>
  )
}

export default ModalView