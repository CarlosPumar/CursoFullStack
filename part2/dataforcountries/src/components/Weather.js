const Weather = ({ weather }) => {
  if (Object.keys(weather).length === 0) {
    return <></>;
  }

  return (
    <>
      <h3>Weather in {weather.location.name}</h3>
      <p>
        <strong>temperature:</strong> {weather.current.temperature}
      </p>
      <img src={weather.current.weather_icons[0]} alt="weather img"></img>
      <p>
        <strong>wind:</strong> {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}
      </p>
    </>
  );
};

export default Weather;
