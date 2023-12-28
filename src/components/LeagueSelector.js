// src/components/LeagueSelector.js
import React from 'react';

const LeagueSelector = ({ leagues, onSelectLeague }) => {
  return (
    <div>
      <label>Select League:</label>
      <select onChange={(e) => onSelectLeague(e.target.value)}>
        <option value="">-- Select --</option>
        {leagues.map((league) => (
          <option key={league.IdLiga} value={league.IdLiga}>
            {league.NameLiga}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelector;
