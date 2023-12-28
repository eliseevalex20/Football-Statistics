// routes/teams.js
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:country/:league', (req, res) => {
  const { country, league } = req.params;

  db.all('SELECT DISTINCT NameTeam1, NameTeam2 FROM match WHERE Country = ? AND NameLiga = ?', [country, league], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const teams = [...new Set(rows.map((row) => row.NameTeam1).concat(rows.map((row) => row.NameTeam2)))];
      res.json(teams);
    }
  });
});

module.exports = router;
