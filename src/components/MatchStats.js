// src/components/MatchStats.js
import React from 'react';

const MatchStats = ({ selectedMatch }) => {
  return (
    <div>
      <h2>Match Statistics</h2>
      {selectedMatch && (
        <div>
          <p>Date: {selectedMatch.Date}</p>
          <p>Teams: {selectedMatch.NameTeam1} vs {selectedMatch.NameTeam2}</p>
          <p>Score: {selectedMatch.ScoreMatch}</p>
          {/* Добавьте другие параметры матча, которые вы хотите отобразить */}
        </div>
      )}
    </div>
  );
};

export default MatchStats;
