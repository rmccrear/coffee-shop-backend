require('dotenv').config();
const axios = require('axios');

const PORT = process.env.PORT || 3002;

const data = [
  {
    name: 'Espresso',
    description: 'A strong and concentrated coffee beverage.',
    price: 2.5,
    category: 'Beverage',
    stock: 10,
    imageUrl: '/sample-images/espresso.jpg',
  },
  {
    name: 'Cappuccino',
    description:
      'An Italian coffee drink that is traditionally prepared with equal parts espresso, steamed milk, and milk foam.',
    price: 3.5,
    category: 'Beverage',
    stock: 5,
    imageUrl: '/sample-images/cappuccino.jpg',
  },
  {
    name: 'Croissant',
    description:
      'A buttery, flaky, viennoiserie pastry named for its crescent shape.',
    price: 2,
    category: 'Food',
    stock: 8,
    imageUrl: '/sample-images/croissant.jpg',
  },
  {
    name: 'Muffin',
    description:
      'A small, sweet baked good that is typically made with ingredients such as flour, sugar, eggs, and butter.',
    price: 2.5,
    category: 'Food',
    stock: 6,
    imageUrl: '/sample-images/muffin.jpg',
  },
];

async function seed() {
  try {
    for (const item of data) {
      const url = `http://localhost:${PORT}/api/v1/products`;
      console.log('Creating item', url);
      await axios.post(url, item);
      console.log('Item created');
    }
  } catch (error) {
    console.error(error);
  }
  console.log('Done');
}
seed();
