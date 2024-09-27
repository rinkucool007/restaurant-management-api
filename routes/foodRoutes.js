const express = require('express');
const router = express.Router();
const {
    getAllFood,
    addFood,
    addFoodToStore,
    getFoodByStoreAndCategory,
    updateFood,
    deleteFood,
    getBestBeforeDays,
    getQuantityByCategory,
    getFoodWithNutrition
} = require('../controllers/foodController');

// GET all food items
router.get('/', getAllFood);

// GET food items by store and category
router.get('/:storeName/category/:categoryName', getFoodByStoreAndCategory);

// POST a new food item to a specific store and category
router.post('/', addFoodToStore);

// GET food item by ID with nutritional details
router.get('/:id/nutrition', getFoodWithNutrition);

// POST a new food item
router.post('/', addFood);

// PUT (update) a food item by ID
router.put('/:id', updateFood);

// DELETE a food item by ID
router.delete('/:id', deleteFood);

// Get food items best before a custom number of days
router.get('/best-before', getBestBeforeDays);

// Get quantity of items present in each category
router.get('/category-quantity', getQuantityByCategory);

module.exports = router;
