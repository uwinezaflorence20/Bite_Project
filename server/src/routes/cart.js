const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();
const DELIVERY_FEE = 2.5;

function getCart(userId) {
  const rows = db
    .prepare(
      `SELECT f.id as id, f.name as name, f.code as code, f.price as price, f.image as image, c.qty as qty
       FROM cart_items c JOIN foods f ON f.id = c.food_id
       WHERE c.user_id = ?`,
    )
    .all(userId);

  const subtotal = rows.reduce((sum, r) => sum + r.price * r.qty, 0);
  const deliveryFee = rows.length ? DELIVERY_FEE : 0;
  return {
    items: rows,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

router.use(requireAuth);

router.get('/', (req, res) => {
  res.json(getCart(req.userId));
});

router.post('/', (req, res) => {
  const { foodId, qty } = req.body || {};
  const quantity = Number(qty) || 1;
  if (!foodId) return res.status(400).json({ error: 'foodId is required' });

  const food = db.prepare('SELECT id FROM foods WHERE id = ?').get(foodId);
  if (!food) return res.status(404).json({ error: 'Food not found' });

  const existing = db
    .prepare('SELECT qty FROM cart_items WHERE user_id = ? AND food_id = ?')
    .get(req.userId, foodId);

  if (existing) {
    db.prepare('UPDATE cart_items SET qty = ? WHERE user_id = ? AND food_id = ?').run(
      existing.qty + quantity,
      req.userId,
      foodId,
    );
  } else {
    db.prepare('INSERT INTO cart_items (user_id, food_id, qty) VALUES (?, ?, ?)').run(
      req.userId,
      foodId,
      quantity,
    );
  }

  res.status(201).json(getCart(req.userId));
});

router.patch('/:foodId', (req, res) => {
  const { delta } = req.body || {};
  const existing = db
    .prepare('SELECT qty FROM cart_items WHERE user_id = ? AND food_id = ?')
    .get(req.userId, req.params.foodId);

  if (!existing) return res.status(404).json({ error: 'Item not in cart' });

  const nextQty = Math.max(1, existing.qty + Number(delta || 0));
  db.prepare('UPDATE cart_items SET qty = ? WHERE user_id = ? AND food_id = ?').run(
    nextQty,
    req.userId,
    req.params.foodId,
  );

  res.json(getCart(req.userId));
});

router.delete('/:foodId', (req, res) => {
  db.prepare('DELETE FROM cart_items WHERE user_id = ? AND food_id = ?').run(
    req.userId,
    req.params.foodId,
  );
  res.json(getCart(req.userId));
});

router.delete('/', (req, res) => {
  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.userId);
  res.json(getCart(req.userId));
});

module.exports = { router, getCart, DELIVERY_FEE };
