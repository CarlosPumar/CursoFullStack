import Weather from "./Weather";
import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    let url = "http://api.weatherstack.com/current";
    url = url.concat("?access_key=" + process.env.REACT_APP_API_KEY);
    url = url.concat("&query=" + country.name);

    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [country]);

  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map((language, i) => (
          <li key={i}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="country flag" />
      <Weather weather={weather} />
    </>
  );
};

export default Country;
