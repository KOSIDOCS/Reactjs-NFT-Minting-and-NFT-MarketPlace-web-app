import React, { useContext } from "react";
import { MarketPlaceContext } from "../context/MarketContext";

const NftCardsLayout = ({ dummyArtists, children }) => {
  // const { nfts } = useContext(MarketPlaceContext);

  return dummyArtists.length !== 0 ? (
    <div className="flex flex-wrap justify-center items-center mt-4">
      {[...dummyArtists].reverse().map((transaction, i) => (
        (React.Children.map(children, (child => React.cloneElement(child, { key: i, ...transaction  }))))
      ))}
    </div>
  ) : (
    <h3 className="text-white text-3xl text-center my-2">
      Buy or Sell NFTs to get added to your Dashboard.
    </h3>
  );
};

export default NftCardsLayout;
