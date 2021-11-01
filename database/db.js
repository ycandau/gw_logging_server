//------------------------------------------------------------------------------
// Database
//------------------------------------------------------------------------------

// Get environment variables
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
const cn = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;

// Create database
const pgp = require('pg-promise')();
const db = pgp(cn);

// File and path modules
const fsp = require('fs/promises');
const { resolve } = require('path');

// Reset the database
const reset = async () => {
  const createPath = resolve(__dirname, 'schema/create.sql');
  const create = await fsp.readFile(createPath, 'utf8');
  await db.query(create);

  const seedsPath = resolve(__dirname, 'seeds/development.sql');
  const seeds = await fsp.readFile(seedsPath, 'utf8');
  await db.query(seeds);
};

// Query: Select all logs
const browseLogs = async () => {
  return await db.query('SELECT * FROM logs;');
};

// Query: Insert a new log
const addLog = async (log) => {
  const [columns, placeholders, params] = insertParams(log);
  return await db.query(
    `INSERT INTO logs (${columns}) VALUES (${placeholders});`,
    params
  );
};

// Helper function to form safe queries
const insertParams = (obj) => {
  const columns = [];
  const placeholders = [];
  const params = [];

  Object.entries(obj).forEach(([key, value], index) => {
    columns.push(key);
    placeholders.push(`$${index + 1}`);
    params.push(value);
  });

  return [columns.join(', '), placeholders.join(', '), params];
};

//------------------------------------------------------------------------------

module.exports = { db, reset, browseLogs, addLog };
