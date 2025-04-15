const MenuItem = require('../models/MenuItem');

const menuController = {
  // Get all menu items with optional category filter
  getAll: async (req, res) => {
    try {
      const { category } = req.query;
      const query = category ? { category } : {};
      
      const menuItems = await MenuItem.find(query);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching menu items', error: error.message });
    }
  },

  // Get a single menu item by ID
  getById: async (req, res) => {
    try {
      const menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching menu item', error: error.message });
    }
  },

  // Create a new menu item
  create: async (req, res) => {
    try {
      const menuItem = new MenuItem(req.body);
      const savedItem = await menuItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ message: 'Error creating menu item', error: error.message });
    }
  },

  // Update a menu item
  update: async (req, res) => {
    try {
      const updatedItem = await MenuItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: 'Error updating menu item', error: error.message });
    }
  },

  // Delete a menu item
  delete: async (req, res) => {
    try {
      const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting menu item', error: error.message });
    }
  }
};

module.exports = menuController; 