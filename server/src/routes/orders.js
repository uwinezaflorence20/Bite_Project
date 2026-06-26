const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');
const { getCart } = require('./cart');

const router = express.Router();

router.use(requireAuth);

router.get('/', (req, res) => {
  const orders = db
    .prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC')
    .all(req.userId);

  const withItems = orders.map((order) => ({
    ...order,
    items: db.prepare('SELECT food_id, name, price, qty FROM order_items WHERE order_id = ?').all(order.id),
  }));

  res.json(withItems);
});

router.post('/', (req, res) => {
  const { paymentMethod } = req.body || {};
  const cart = getCart(req.userId);

  if (!cart.items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const result = db
    .prepare(
      'INSERT INTO orders (user_id, subtotal, delivery_fee, total, payment_method) VALUES (?, ?, ?, ?, ?)',
    )
    .run(req.userId, cart.subtotal, cart.deliveryFee, cart.total, paymentMethod || 'cash');

  const orderId = Number(result.lastInsertRowid);
  const insertItem = db.prepare(
    'INSERT INTO order_items (order_id, food_id, name, price, qty) VALUES (?, ?, ?, ?, ?)',
  );
  for (const item of cart.items) {
    insertItem.run(orderId, item.id, item.name, item.price, item.qty);
  }

  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.userId);

  res.status(201).json({
    id: orderId,
    subtotal: cart.subtotal,
    deliveryFee: cart.deliveryFee,
    total: cart.total,
    paymentMethod: paymentMethod || 'cash',
    items: cart.items,
  });
});

module.exports = router;
