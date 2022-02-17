const ViewBtn = ({ title }) => (
   <div className="absolute cursor-pointer top-0 right-6 rounded-xl w-128 h-11 mx-auto mt-10 bg-gradient-to-r p-[2px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
   <div className={`flex h-10 flex-row justify-center items-center text-white bg-[#100E14] rounded-lg p-3`}>
      <span className='pl-px text-lg font-semibold'>{title}</span>
     </div>
</div>

  );
export default ViewBtn;
  