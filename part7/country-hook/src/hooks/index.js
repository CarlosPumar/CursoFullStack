import { useState, useEffect } from 'react';
import countryService from '../services/country';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const get = async (name) => {
    let countryObject = await countryService.get(name);
    setCountry(countryObject);
  };

  useEffect(() => {
    get(name);
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
