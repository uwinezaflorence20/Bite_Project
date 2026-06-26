const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const dbPath = path.join(__dirname, '..', 'data', 'foodgo.sqlite');
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS foods (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    price REAL NOT NULL,
    rating REAL NOT NULL,
    time TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    code TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS favorites (
    user_id INTEGER NOT NULL,
    food_id TEXT NOT NULL,
    PRIMARY KEY (user_id, food_id)
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    user_id INTEGER NOT NULL,
    food_id TEXT NOT NULL,
    qty INTEGER NOT NULL,
    PRIMARY KEY (user_id, food_id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subtotal REAL NOT NULL,
    delivery_fee REAL NOT NULL,
    total REAL NOT NULL,
    payment_method TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    order_id INTEGER NOT NULL,
    food_id TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    qty INTEGER NOT NULL
  );
`);

const foodCount = db.prepare('SELECT COUNT(*) AS count FROM foods').get().count;

if (foodCount === 0) {
  const seedFoods = [
    {
      id: '1',
      name: 'Humburger',
      subtitle: 'Veggie Burger',
      price: 8.24,
      rating: 4.8,
      time: '26 mins',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      code: 'Cheeseburger Wendy’s Burger',
    },
    {
      id: '2',
      name: 'Humburger',
      subtitle: 'Veggie Burger',
      price: 7.5,
      rating: 4.8,
      time: '22 mins',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      code: 'Classic Cheeseburger',
    },
    {
      id: '3',
      name: 'Humburger',
      subtitle: 'Veggie Burger',
      price: 9.1,
      rating: 4.6,
      time: '30 mins',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      code: 'Bacon Deluxe Burger',
    },
    {
      id: '4',
      name: 'Humburger',
      subtitle: 'Veggie Burger',
      price: 6.99,
      rating: 4.9,
      time: '18 mins',
      image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      code: 'Double Patty Burger',
    },
    {
      id: 'f1',
      name: 'Fries and chips',
      subtitle: 'Crispy Side',
      price: 5.0,
      rating: 4.5,
      time: '15 mins',
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80',
      description: 'Golden crispy fries served with your favorite dipping sauce.',
      code: 'Fries 2552',
    },
    {
      id: 'f2',
      name: 'Loaded fries',
      subtitle: 'Crispy Side',
      price: 6.5,
      rating: 4.7,
      time: '17 mins',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80',
      description: 'Fries loaded with cheese, herbs and a smoky sauce.',
      code: 'Loaded Fries 2552',
    },
  ];

  const insert = db.prepare(
    'INSERT INTO foods (id, name, subtitle, price, rating, time, image, description, code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  );
  for (const f of seedFoods) {
    insert.run(f.id, f.name, f.subtitle, f.price, f.rating, f.time, f.image, f.description, f.code);
  }
}

module.exports = db;
