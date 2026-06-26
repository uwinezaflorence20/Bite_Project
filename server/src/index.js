const express = require('express');
const cors = require('cors');
require('./db');

const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/foods');
const { router: cartRoutes } = require('./routes/cart');
const favoriteRoutes = require('./routes/favorites');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Foodgo API listening on http://0.0.0.0:${PORT}`);
});
