const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();

router.use(requireAuth);

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT food_id FROM favorites WHERE user_id = ?').all(req.userId);
  res.json(rows.map((r) => r.food_id));
});

router.post('/:foodId', (req, res) => {
  const { foodId } = req.params;
  const food = db.prepare('SELECT id FROM foods WHERE id = ?').get(foodId);
  if (!food) return res.status(404).json({ error: 'Food not found' });

  const existing = db
    .prepare('SELECT 1 FROM favorites WHERE user_id = ? AND food_id = ?')
    .get(req.userId, foodId);

  if (existing) {
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND food_id = ?').run(req.userId, foodId);
  } else {
    db.prepare('INSERT INTO favorites (user_id, food_id) VALUES (?, ?)').run(req.userId, foodId);
  }

  const rows = db.prepare('SELECT food_id FROM favorites WHERE user_id = ?').all(req.userId);
  res.json(rows.map((r) => r.food_id));
});

module.exports = router;
