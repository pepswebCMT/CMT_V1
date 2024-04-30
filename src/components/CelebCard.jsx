const CelebCard = ({ celebDetails }) => {
  return (
    <div className="w-72 h-96 rounded-2xl shadow-2xl flex flex-col gap-3 items-center">
      <div className="relative w-full">
        <img
          src={celebDetails.imageUrl}
          alt={celebDetails.title}
          className="w-full h-64 rounded-2xl object-cover"
        />
        <h3 className="w-full absolute bottom-0 z-20 text-white text-center text-lg font-bold rounded-b-2xl rounded-bl-2xl bg-opacity-50 bg-black">
          {celebDetails.title}
        </h3>
      </div>

      <div className="w-full p-3 flex flex-col justify-around text-center items-center text-lg">
        <p>{celebDetails.country}</p>
        <p>{celebDetails.cemetery}</p>
      </div>
    </div>
  );
};

export default CelebCard;
