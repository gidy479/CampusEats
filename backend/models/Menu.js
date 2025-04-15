const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the item name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide the price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please provide the category'],
    enum: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages']
  },
  image: {
    type: String,
    default: 'default-food.jpg'
  },
  preparationTime: {
    type: Number,
    required: [true, 'Please provide preparation time in minutes'],
    min: [1, 'Preparation time must be at least 1 minute']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema); 