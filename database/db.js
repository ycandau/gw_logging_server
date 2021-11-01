// Get environment variables
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
const cn = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;

// Create database
const pgp = require('pg-promise')();
const db = pgp(cn);

db.any('SELECT * FROM logs')
  .then((data) => {
    console.log('DATA:', data);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });

module.exports = db;
