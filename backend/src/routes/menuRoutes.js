const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', menuController.getAll);
router.get('/:id', menuController.getById);

// Protected routes (require authentication)
router.post('/', auth, menuController.create);
router.put('/:id', auth, menuController.update);
router.delete('/:id', auth, menuController.delete);

module.exports = router; 