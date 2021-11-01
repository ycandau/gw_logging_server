//------------------------------------------------------------------------------
// Router
//------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/reset', async (_, res) => {
    await db.reset();
    res.redirect('/api');
  });

  router.get('/', async (_, res) => {
    const data = await db.browseLogs();
    res.json(data);
  });

  router.post('/', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const log = { ip, method: 'post', url: '/', ...req.body };
    await db.addLog(log);
    res.end();
  });

  return router;
};
