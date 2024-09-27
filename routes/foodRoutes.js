const express = require('express');
const {
    getAllFood,
    getFoodById,
    createFood,
    updateFood,
    patchFood,
    deleteFood,
    applyPricingLogic
} = require('../controllers/foodController');

const router = express.Router();

router.get('/', getAllFood);
router.get('/:id', getFoodById);
router.post('/', createFood);
router.put('/:id', updateFood);
router.patch('/:id', patchFood);
router.delete('/:id', deleteFood);
router.get('/apply-pricing-logic', applyPricingLogic);

module.exports = router;
