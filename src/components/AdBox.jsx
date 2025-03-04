import { CircleFlag } from "react-circle-flags";

const AdBox = () => {
  return (
    <section className="w-full h-full bg-blue-50 flex flex-col justify-center items-center p-6 rounded-xl">
      <p className="text-3xl font-bold"></p>
      <CircleFlag countryCode="fr" className="w-16" />
    </section>
  );
};

export default AdBox;
