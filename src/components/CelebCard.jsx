import { FaStar } from "react-icons/fa";

const CelebCard = ({ celebDetails }) => {
  return (
    <div className="w-72 h-96 rounded-2xl shadow-2xl flex flex-col gap-3 items-center dark:bg-dark-400 font-aileron">
      <div className="relative w-full">
        <img
          src={celebDetails.imageUrl}
          alt={celebDetails.title}
          className="w-full h-64 rounded-2xl object-cover object-top"
        />
        <div className="w-full p-1 absolute flex justify-center gap-4 items-center bottom-0 z-20 text-white text-center text-xl font-bold rounded-b-2xl rounded-bl-2xl bg-opacity-50 bg-black">
          <FaStar />
          <h3>{celebDetails.title}</h3>
          
        </div>
      </div>
      <div className="w-full p-1 flex flex-col justify-around text-center items-center font-aileron text-2xl font-bold">
        <p>{celebDetails.country}</p>
        <p>{celebDetails.cemetery}</p>
      </div>
    </div>
  );
};

export default CelebCard;
