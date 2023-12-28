// CountrySelector.js
import React from 'react';

const CountrySelector = ({ countries, onSelectCountry }) => {
  return (
    <select onChange={(e) => onSelectCountry(e.target.value)}>
      {countries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
