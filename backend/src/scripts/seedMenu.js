const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
require('dotenv').config();

const menuItems = [
  {
    name: 'Jollof Rice with Chicken',
    description: 'Aromatic rice cooked in a rich tomato sauce with tender chicken pieces',
    price: 25.00,
    category: 'lunch',
    preparationTime: 30,
    image: '/images/jollof-rice.jpg'
  },
  {
    name: 'Waakye',
    description: 'Rice and beans cooked with millet leaves, served with spaghetti, gari, and stew',
    price: 20.00,
    category: 'lunch',
    preparationTime: 45,
    image: '/images/waakye.jpg'
  },
  {
    name: 'Banku with Tilapia',
    description: 'Fermented corn and cassava dough served with grilled tilapia and hot pepper sauce',
    price: 30.00,
    category: 'dinner',
    preparationTime: 40,
    image: '/images/banku-tilapia.jpg'
  },
  {
    name: 'Fufu with Light Soup',
    description: 'Pounded cassava and plantain served with light soup and goat meat',
    price: 25.00,
    category: 'dinner',
    preparationTime: 35,
    image: '/images/fufu-soup.jpg'
  },
  {
    name: 'Kenkey with Fried Fish',
    description: 'Fermented corn dough served with fried fish and hot pepper sauce',
    price: 22.00,
    category: 'dinner',
    preparationTime: 30,
    image: '/images/kenkey-fish.jpg'
  },
  {
    name: 'Red Red',
    description: 'Beans stew with fried plantain, served with gari',
    price: 18.00,
    category: 'breakfast',
    preparationTime: 25,
    image: '/images/red-red.jpg'
  },
  {
    name: 'Koko with Koose',
    description: 'Hausa koko (millet porridge) with fried bean cakes',
    price: 15.00,
    category: 'breakfast',
    preparationTime: 20,
    image: '/images/koko-koose.jpg'
  },
  {
    name: 'Yam and Garden Egg Stew',
    description: 'Boiled yam served with garden egg stew',
    price: 20.00,
    category: 'lunch',
    preparationTime: 30,
    image: '/images/yam-garden-egg.jpg'
  },
  {
    name: 'Tuo Zaafi',
    description: 'Northern Ghana staple made from corn flour, served with ayoyo soup',
    price: 18.00,
    category: 'dinner',
    preparationTime: 35,
    image: '/images/tuo-zaafi.jpg'
  },
  {
    name: 'Kelewele',
    description: 'Spicy fried plantain cubes',
    price: 12.00,
    category: 'snacks',
    preparationTime: 15,
    image: '/images/kelewele.jpg'
  },
  {
    name: 'Bofrot',
    description: 'Ghanaian doughnuts',
    price: 10.00,
    category: 'snacks',
    preparationTime: 20,
    image: '/images/bofrot.jpg'
  },
  {
    name: 'Palm Wine',
    description: 'Traditional alcoholic beverage made from palm tree sap',
    price: 15.00,
    category: 'beverages',
    preparationTime: 5,
    image: '/images/palm-wine.jpg'
  },
  {
    name: 'Sobolo',
    description: 'Hibiscus tea, a refreshing traditional drink',
    price: 8.00,
    category: 'beverages',
    preparationTime: 5,
    image: '/images/sobolo.jpg'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert new menu items
    await MenuItem.insertMany(menuItems);
    console.log('Successfully seeded menu items');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 