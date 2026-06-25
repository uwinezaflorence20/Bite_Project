export type FoodItem = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  time: string;
  image: string;
  description: string;
  code: string;
};

export const categories = ['All', 'Combo', 'Sliders', 'Classic'];

export const homeCategories = ['Food', 'Drink', 'Take away', 'Stake'];

export const foods: FoodItem[] = [
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
];

export const fries = [
  {
    id: 'f1',
    name: 'Fries and chips',
    code: '2552',
    price: 50,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80',
  },
  {
    id: 'f2',
    name: 'Fries and chips',
    code: '2552',
    price: 50,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80',
  },
];

export type CartItem = {
  id: string;
  name: string;
  code: string;
  price: number;
  qty: number;
  image: string;
};

export const cartItems: CartItem[] = [
  {
    id: 'c1',
    name: 'Pizza and chips',
    code: '2552',
    price: 50,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
  },
  {
    id: 'c2',
    name: 'Pizza and chips',
    code: '2552',
    price: 50,
    qty: 2,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
  },
];
