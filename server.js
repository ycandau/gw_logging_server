//------------------------------------------------------------------------------
// server.js
//------------------------------------------------------------------------------

require('./src/environment');
const PORT = process.env.PORT || 8000;

// Create and initialize the server
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json({ extended: false }));

// Database
const db = require('./database/db');

// Router
const router = require('./routes/api')(db);
app.use('/api', router);

//----------------------------------------------------------------------------

// Listen
app.listen(PORT, () =>
  console.log(`
-------------------------------
Explorer listening on port ${PORT}
-------------------------------`)
);
