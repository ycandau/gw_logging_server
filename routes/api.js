//------------------------------------------------------------------------------
// Router
//------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (_, res) => {
    const data = { method: 'get', action: '/' };
    res.json(data);
  });

  router.post('/', async (req, res) => {
    const body = req.body;
    const data = { method: 'get', action: '/', body };
    res.json(data);
  });

  return router;
};
