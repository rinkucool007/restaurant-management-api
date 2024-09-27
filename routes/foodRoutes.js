const express = require('express');
const router = express.Router();
const {
    getAllFood,
    addFood,
    updateFood,
    deleteFood,
    checkExpiringSoon
} = require('../controllers/foodController');

// GET all food items
router.get('/', getAllFood);

// POST a new food item
router.post('/', addFood);

// PUT (update) a food item by ID
router.put('/:id', updateFood);

// DELETE a food item by ID
router.delete('/:id', deleteFood);

// Check food items that will expire by a certain date
router.get('/check-expiry', checkExpiringSoon);

module.exports = router;
