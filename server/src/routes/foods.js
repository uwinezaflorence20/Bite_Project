const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM foods').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM foods WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Food not found' });
  res.json(row);
});

module.exports = router;
