import Filter from "./Filter";
import Countries from "./Countries";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  const handleOnChangeFilter = (event) => {
    filterByValue(event.target.value, countries);
  };

  const filterByValue = (value, countries) => {
    const newFilteredCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(value.toLocaleLowerCase());
    });
    setFilter(value);
    setFilteredCountries(newFilteredCountries);
  };

  return (
    <div className="App">
      <Filter value={filter} handleOnChange={handleOnChangeFilter} />
      <br />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
