import React from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const nav = useNavigate();

  return (
    <main className="w-full pt-20 pb-20 dark:bg-dark-200 dark:text-white font-josefin">
      <Navbar />
      <section className="w-full overflow-hidden flex flex-col justify-between gap-4 items-center p-5">
        <h1 className="w-full max-w-96 font-bold text-4xl p-2 text-center">
          Page non trouvée!
        </h1>
        <Link
          className="w-full max-w-96 font-bold text-4xl p-2 text-center"
          to={"/home"}
        >
          Cliquer ici pour retourner sur les sentiers battus.
        </Link>
        ;
      </section>
    </main>
  );
}

export default NotFound;
