const fs = require('fs');
const path = require('path');

// Helper to read food data
const readFoodData = () => {
    const dataPath = path.join(__dirname, '../data/food.json');
    const foodData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return foodData;
};

// Helper to write food data
const writeFoodData = (data) => {
    const dataPath = path.join(__dirname, '../data/food.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all food items
exports.getAllFood = (req, res) => {
    const foodData = readFoodData();
    res.json(foodData);
};

// POST new food item
exports.addFood = (req, res) => {
    const foodData = readFoodData();
    const newFood = req.body;
    newFood.id = foodData.length + 1;
    foodData.push(newFood);
    writeFoodData(foodData);
    res.json(newFood);
};

// PUT (update) a food item
exports.updateFood = (req, res) => {
    const foodData = readFoodData();
    const foodId = parseInt(req.params.id);
    const index = foodData.findIndex(item => item.id === foodId);

    if (index !== -1) {
        foodData[index] = { ...foodData[index], ...req.body };
        writeFoodData(foodData);
        res.json(foodData[index]);
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
};

// DELETE a food item
exports.deleteFood = (req, res) => {
    const foodData = readFoodData();
    const foodId = parseInt(req.params.id);
    const newFoodData = foodData.filter(item => item.id !== foodId);

    if (newFoodData.length !== foodData.length) {
        writeFoodData(newFoodData);
        res.json({ message: 'Food item deleted' });
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
};

// Check for products expiring soon
exports.checkExpiringSoon = (req, res) => {
    const foodData = readFoodData();
    const targetDate = req.query.date ? new Date(req.query.date) : new Date();

    const expiringSoon = foodData.filter(item => {
        const expiryDate = new Date(item.expiryDate);
        return expiryDate <= targetDate;
    });

    res.json({
        expiringSoon: expiringSoon,
        count: expiringSoon.length
    });
};
