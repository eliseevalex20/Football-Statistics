// routes/teamStats.js
const express = require('express');
const router = express.Router();

let matchesData = [];

router.post('/', (req, res) => {
  const { selectedTeam, matches } = req.body;

  matchesData = matches;

  const teamStats = calculateTeamStats(selectedTeam, matchesData);

  res.json(teamStats);
});

const calculateTeamStats = (selectedTeam, matches) => {
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsScored = 0;
  let goalsConceded = 0;
  let maxGoalsInMatch = 0;
  let minGoalsInMatch = Infinity;
  let maxOpponentGoals = 0;
  let minOpponentGoals = Infinity;

  matches.forEach(match => {
    const [team1Goals, team2Goals] = match.score.split(' : ').map(Number);

    if (match.team1 === selectedTeam) {
      goalsScored += team1Goals;
      goalsConceded += team2Goals;

      maxGoalsInMatch = Math.max(maxGoalsInMatch, team1Goals);
      minGoalsInMatch = Math.min(minGoalsInMatch, team1Goals);
      maxOpponentGoals = Math.max(maxOpponentGoals, team2Goals);
      minOpponentGoals = Math.min(minOpponentGoals, team2Goals);
    } else if (match.team2 === selectedTeam) {
      goalsScored += team2Goals;
      goalsConceded += team1Goals;

      maxGoalsInMatch = Math.max(maxGoalsInMatch, team2Goals);
      minGoalsInMatch = Math.min(minGoalsInMatch, team2Goals);
      maxOpponentGoals = Math.max(maxOpponentGoals, team1Goals);
      minOpponentGoals = Math.min(minOpponentGoals, team1Goals);
    }

    if (team1Goals > team2Goals) {
      wins++;
    } else if (team1Goals === team2Goals) {
      draws++;
    } else {
      losses++;
    }
  });

  const averageGoalsScored = (goalsScored / matches.length).toFixed(2);
  const averageGoalsConceded = (goalsConceded / matches.length).toFixed(2);

  return {
    wins,
    draws,
    losses,
    goalsScored,
    goalsConceded,
    maxGoalsInMatch,
    minGoalsInMatch,
    maxOpponentGoals,
    minOpponentGoals,
    averageGoalsScored,
    averageGoalsConceded,
  };
};

module.exports = router;
