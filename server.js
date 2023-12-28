// app.js
const express = require('express');
const cors = require('cors');
const db = require('./routes/db');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Роутеры для получения данных
const countriesRouter = require('./routes/countries');
const leaguesRouter = require('./routes/leagues');
const teamsRouter = require('./routes/teams');
const matchStatsRouter = require('./routes/matchStats');
const teamStatsRouter = require('./routes/teamStats');

app.use('/countries', countriesRouter);
app.use('/leagues', leaguesRouter);
app.use('/teams', teamsRouter);
app.use('/match-stats', matchStatsRouter);
app.use('/team-stats', teamStatsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
