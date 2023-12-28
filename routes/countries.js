// routes/countries.js
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  const { country } = req.params;

  db.all('SELECT DISTINCT Country FROM match', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const countries = rows.map((row) => row.Country);
      res.json(countries);
    }
  });
});

module.exports = router;
