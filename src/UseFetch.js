import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://randomuser.me/api/";

const UseFetch = () => {
  const [nacitanie, setNacitanie] = useState(true);
  const [error, setError] = useState(false);
  const [osoba, setOsoba] = useState(null);

  const fetchDat = async () => {
    setNacitanie(true);
    try {
      const { data } = await axios(url);
      const { results } = data;
      const { name, email, dob, location, phone, login, picture } = results[0];
      const { street } = location;
      const clovek = {
        meno: `${name.first} ${name.last}`,
        email,
        vek: dob.age,
        ulica: `${street.name} ${street.number}`,
        mobil: phone,
        heslo: login.password,
        obrazok: picture.large,
      };
      setNacitanie(false);
      setError(false);
      setOsoba(clovek);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDat();
  }, []);

  return { osoba, nacitanie, error, fetchDat };
};

export default UseFetch;
