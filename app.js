const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const dbPath = path.resolve(__dirname, 'src', 'components', 'football.db');
const db = new sqlite3.Database(dbPath);

app.get('/countries', (req, res) => {
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

app.get('/leagues/:country', (req, res) => {
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

app.get('/teams/:country/:league', (req, res) => {
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

app.get('/match-stats/:country/:league/:team/:count', (req, res) => {
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

app.get('/match-stats/:country/:league/:team/:count/:year', (req, res) => {
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

app.get('/match-stats/:country/:league/:team/:count/:year/:location', (req, res) => {
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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
