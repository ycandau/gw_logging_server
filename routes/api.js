//------------------------------------------------------------------------------
// Router
//------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

const WebSocket = require('ws');

const handleError = (error) => console.error(`\nERROR: ${error.message}\n`);

module.exports = (db, wss) => {
  router.get('/reset', async (_, res) => {
    try {
      await db.reset();
    } catch (error) {
      handleError(error);
    }
    res.redirect('/api');
  });

  router.get('/', async (_, res) => {
    try {
      const data = await db.browseLogs();
      res.json(data);

      // Catch
    } catch (error) {
      handleError(error);
      res.status(500).send(error.message);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const log = { ip, method: 'post', url: '/', ...req.body };

      await db.addLog(log);
      const data = await db.browseLogs();

      wss.clients.forEach(async (client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
      res.json(data);

      // Catch
    } catch (error) {
      handleError(error);
      res.status(500).send(error.message);
    }
  });

  return router;
};
