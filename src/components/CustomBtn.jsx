import { HiArrowNarrowRight } from "react-icons/hi";

const CustomBtn = ({ title, isIcon, isWidthFull, my, callback }) => (
    <button
              type="button"
              onClick={() => callback()}
              className={`btn-gradient ${isWidthFull && 'w-full'} flex flex-row justify-center items-center ${my ? my : 'my-5'} p-3 rounded-xl cursor-pointer`}
            >
              <p className={`text-white ${isIcon && 'mr-3'} text-base font-semibold`}>
                {title} 
              </p> {isIcon && <HiArrowNarrowRight fontSize={21} color="#fff" />}
            </button>
  );
  
export default CustomBtn;
