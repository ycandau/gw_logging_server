//------------------------------------------------------------------------------
// Router
//------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

const handleError = (error) => console.error(`\nERROR: ${error.message}\n`);

module.exports = (db) => {
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
      res.end();
    } catch (error) {
      handleError(error);
      res.status(500).send(error.message);
    }
  });

  return router;
};
