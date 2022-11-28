import react from "react";
import { useState, useEffect } from "react";
import UseFetch from "./UseFetch";

import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const { osoba, nacitanie, error, fetchDat } = UseFetch();
  const [titul, setTitul] = useState("meno");
  const [hodnota, setHodnota] = useState("Náhodná osoba");

  const handlerV = (e) => {
    if (e.target.classList.contains("ikona")) {
      const novaHodnota = e.target.dataset.nazov;
      setTitul(novaHodnota);
      setHodnota(osoba[novaHodnota]);
    }
  };

  useEffect(() => {
    setTitul("meno");
    setHodnota(osoba?.meno);
  }, [osoba]);

  return (
    <>
      <section className="container">
        <h1 className="text-center mt-5">React Projekt - Náhodná osoba API</h1>

        {error && (
          <div
            className="alert alert-danger text-center mt-5 error"
            role="alert"
          >
            Error! Načítanie API zlyhalo.
          </div>
        )}
        <article className="text-center shadow-lg mt-5">
          <div className="obrazok">
            <img
              src={osoba?.obrazok || defaultImage}
              className="img-fluid"
              alt={osoba?.meno || "Náhodná Osoba"}
            />
          </div>

          <p className="mt-4">My {titul} is</p>
          <h3 className="mt-1">{hodnota}</h3>
          <div className="elementy">
            <div className="ikona" data-nazov="meno" onMouseOver={handlerV}>
              <FaUser />
            </div>
            <div className="ikona" data-nazov="email" onMouseOver={handlerV}>
              <FaEnvelopeOpen />
            </div>

            <div className="ikona" data-nazov="vek" onMouseOver={handlerV}>
              <FaCalendarTimes />
            </div>

            <div className="ikona" data-nazov="ulica" onMouseOver={handlerV}>
              <FaMap />
            </div>

            <div className="ikona" data-nazov="mobil" onMouseOver={handlerV}>
              <FaPhone />
            </div>

            <div className="ikona" data-nazov="heslo" onMouseOver={handlerV}>
              <FaLock />
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={() => fetchDat()}>
            {nacitanie ? "Načítavam..." : "Náhodny človek"}
          </button>
        </article>
      </section>
    </>
  );
}

export default App;
