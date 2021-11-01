//------------------------------------------------------------------------------
// Environment
//------------------------------------------------------------------------------

const { resolve } = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = resolve(__dirname, '../.env.' + NODE_ENV);

// Switch .env file based on NODE_ENV
require('dotenv').config({ path });

//------------------------------------------------------------------------------

module.exports = NODE_ENV;
