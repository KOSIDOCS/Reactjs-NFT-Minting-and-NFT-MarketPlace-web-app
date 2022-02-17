import  { AiOutlinePlus } from 'react-icons/ai';

const FollowBtn = ({}) => (
    <div className="flex cursor-pointer flex-row p-1 justify-center items-center text-white rounded-xl w-full h-46 bg-[#100E14]">
      <AiOutlinePlus fontSize={10} color="#fff" />
      <span className='ml-0.5 text-base font-medium'>Follow</span>
</div>

  );
export default FollowBtn;
