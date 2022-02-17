import dummyArtists from "../utils/dummyArtists";
import { FollowBtn } from ".";

const boxColors = ['box1-grad', 'box2-grad', 'box3-grad']

let bgColorGd = boxColors[Math.floor(Math.random() * boxColors.length)]

const ArtistsCards = ({  addressTo, addressFrom, timestamp, message, keyword, amount, url, userUrl }) => (
    <div className="m-4 flex flex-1
    2xl:min-w-[250px]
    2xl:max-w-[250px]
    sm:min-w-[200px]
    sm:max-w-[200px]
    min-h-[300px]
    max-h-[300px]
    min-w-full
    relative
    flex-col rounded-md hover:shadow-2xl clip-box cursor-pointer" 
    style={{backgroundImage: `url(${url})`, backgroundPosition: "center", backgroundSize: "cover"}}>
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
        <div className="display-flex justify-center item-center w-full mb-6 mt-12 p-2">
          <p className="text-center text-lg font-semibold pt-4 mb-3 text-white">Smart Toy Art</p>
          <div className="flex justify-between max-w-[250px]">
            <FollowBtn />
          </div>
        </div>
      </div>
      <div 
      className="z-50 absolute flex justify-center items-center rounded-full bg-black" 
      style={{height: "129px", width: "129px", top: "67px", left: "58px"}}>
         <img
        //   src={gifUrl || url}
          src={userUrl}
          alt="nature"
          style={{height: "120px", width: "120px"}}
          className="rounded-full object-cover"
        />
        </div>
    </div>
);

const FeaturedArtists = ({}) => (
    <div className="flex w-full justify-center items-center 2xl:px-20">
      <div className="flex flex-col md:p-4 py-4 px-4">
        <p className="text-white pl-6 text-2xl font-bold">Featured Artists</p>
        <div className="flex flex-wrap justify-center items-center mt-4">
               {[...dummyArtists].reverse().map((transaction, i) => (
           <ArtistsCards key={i} {...transaction} />
           ))}
        </div>
      </div>
    </div>
  );
export default FeaturedArtists;