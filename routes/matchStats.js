// routes/matchStats.js
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:country/:league/:team/:count', (req, res) => {
  const { country, league, team, count } = req.params;

  const query = `
    SELECT * FROM match
    WHERE Country = ? AND NameLiga = ? AND (NameTeam1 = ? OR NameTeam2 = ?)
    ORDER BY Date DESC
    LIMIT ${count}
  `;

  db.all(query, [country, league, team, team], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/:country/:league/:team/:count/:year', (req, res) => {
  const { country, league, team, count, year } = req.params;

  let query = `
    SELECT * FROM match
    WHERE Country = ? AND NameLiga = ? AND (NameTeam1 = ? OR NameTeam2 = ?)
  `;

  if (year !== 'All') {
    query += ` AND SUBSTR(Date, 1, 4) = ?`;
  }

  query += ` ORDER BY Date DESC LIMIT ${count}`;

  const params = year !== 'All' ? [country, league, team, team, year] : [country, league, team, team];

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const sortedMatches = rows.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      res.json(sortedMatches);
    }
  });
});

router.get('/:country/:league/:team/:count/:year/:location', (req, res) => {
  const { country, league, team, count, year, location } = req.params;

  let query = `
    SELECT * FROM match
    WHERE Country = ? AND NameLiga = ? AND (NameTeam1 = ? OR NameTeam2 = ?)
  `;

  const params = [country, league, team, team];

  if (year !== 'All') {
    query += ` AND SUBSTR(Date, 1, 4) = ?`;
    params.push(year);
  }

  if (location !== 'All') {
    if (location === 'Home') {
      query += ` AND NameTeam1 = ?`;
    } else if (location === 'Away') {
      query += ` AND NameTeam2 = ?`;
    }
    params.push(team);
  }

  query += ` ORDER BY Date DESC LIMIT ${count}`;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const sortedMatches = rows.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      res.json(sortedMatches);
    }
  });
});

module.exports = router;
