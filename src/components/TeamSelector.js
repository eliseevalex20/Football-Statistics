// src/components/TeamSelector.js
import React from 'react';

const TeamSelector = ({ teams, onSelectTeam }) => {
  return (
    <div>
      <label>Select Team:</label>
      <select onChange={(e) => onSelectTeam(e.target.value)}>
        <option value="">-- Select --</option>
        {teams.map((team) => (
          <option key={team.IdMatch} value={team.IdMatch}>
            {team.NameTeam1} vs {team.NameTeam2}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;
