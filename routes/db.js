// db.js
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'src', 'components', 'football.db');
const db = new sqlite3.Database(dbPath);

module.exports = db;
