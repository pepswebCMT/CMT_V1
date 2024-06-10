import React from "react";
import Navbar from "../../components/Navbar";

function Unavailable() {
  return (
    <main className="w-full pt-20 pb-20 dark:bg-dark-200 dark:text-white font-josefin">
      <Navbar />
      <section className="w-full overflow-hidden flex flex-col justify-between gap-4 items-center p-5">
        <h1 className="w-full max-w-96 font-bold text-4xl p-2 text-center">
          Application non disponible.
        </h1>
        ;
      </section>
    </main>
  );
}

export default Unavailable;
