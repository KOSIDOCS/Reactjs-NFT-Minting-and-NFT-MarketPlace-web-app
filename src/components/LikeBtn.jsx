import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

const LikeBtn = ({ isLiked, totalLike, bg }) => (
    <div className="absolute cursor-pointer top-0 right-6 rounded-xl w-128 h-11 mx-auto mt-10 bg-gradient-to-r p-[2px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
   <div className={`flex h-10 flex-row justify-center items-center text-white ${bg} rounded-lg p-3`}>
      {isLiked ? <AiFillHeart fontSize={32} color="red"/> : <AiOutlineHeart fontSize={32} color="#fff" />}
      <span className='pl-px text-lg font-semibold'>{totalLike}</span>
     </div>
</div>

  );
export default LikeBtn;
  