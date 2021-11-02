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

// Websocket
const http = require('http');
const server = http.Server(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.onmessage = () => console.log(`WebSocket connected`);
});

// Router
const router = require('./routes/api')(db, wss);
app.use('/api', router);

// Listen
server.listen(PORT, () =>
  console.log(`
-------------------------------
Explorer listening on port ${PORT}
-------------------------------`)
);
