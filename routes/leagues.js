// routes/leagues.js
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:country', (req, res) => {
  const { country } = req.params;

  db.all('SELECT DISTINCT NameLiga FROM match WHERE Country = ?', [country], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const leagues = rows.map((row) => row.NameLiga);
      res.json(leagues);
    }
  });
});

module.exports = router;
