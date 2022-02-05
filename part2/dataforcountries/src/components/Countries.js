import Country from "./Country";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <>Too many matches, specify another filter</>;
  }

  if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <p key={country.numericCode}>{country.name}</p>
        ))}
      </>
    );
  }

  if (countries.length === 1) {
    return (
      <>
        <Country country={countries[0]} />
      </>
    );
  }

  return <>No countries</>;
};

export default Countries;
