const fs = require('fs');
const path = require('path');
const foodFilePath = path.join(__dirname, '../data/food.json');

// Helper function to read JSON data
const readFoodData = () => {
    const foodData = fs.readFileSync(foodFilePath);
    return JSON.parse(foodData);
};

// Helper function to write JSON data
const writeFoodData = (data) => {
    fs.writeFileSync(foodFilePath, JSON.stringify(data, null, 2));
};

// GET all food items
exports.getAllFood = (req, res) => {
    const foodData = readFoodData();
    res.json(foodData);
};

// GET food item by ID
exports.getFoodById = (req, res) => {
    const foodData = readFoodData();
    const foodItem = foodData.find(item => item.id === parseInt(req.params.id));
    if (!foodItem) return res.status(404).json({ message: 'Food not found' });
    res.json(foodItem);
};

// POST new food item
exports.createFood = (req, res) => {
    const foodData = readFoodData();
    const newFood = {
        id: foodData.length + 1,
        name: req.body.name,
        price: req.body.price,
        manufactureDate: req.body.manufactureDate,
        expiryDate: req.body.expiryDate
    };
    foodData.push(newFood);
    writeFoodData(foodData);
    res.status(201).json(newFood);
};

// PUT update food item by ID
exports.updateFood = (req, res) => {
    const foodData = readFoodData();
    const foodIndex = foodData.findIndex(item => item.id === parseInt(req.params.id));
    if (foodIndex === -1) return res.status(404).json({ message: 'Food not found' });
    
    const updatedFood = { ...foodData[foodIndex], ...req.body };
    foodData[foodIndex] = updatedFood;
    writeFoodData(foodData);
    res.json(updatedFood);
};

// PATCH partial update food item by ID
exports.patchFood = (req, res) => {
    const foodData = readFoodData();
    const foodIndex = foodData.findIndex(item => item.id === parseInt(req.params.id));
    if (foodIndex === -1) return res.status(404).json({ message: 'Food not found' });

    const patchedFood = { ...foodData[foodIndex], ...req.body };
    foodData[foodIndex] = patchedFood;
    writeFoodData(foodData);
    res.json(patchedFood);
};

// DELETE food item by ID
exports.deleteFood = (req, res) => {
    const foodData = readFoodData();
    const newFoodData = foodData.filter(item => item.id !== parseInt(req.params.id));
    if (newFoodData.length === foodData.length) return res.status(404).json({ message: 'Food not found' });

    writeFoodData(newFoodData);
    res.status(204).send();
};

// Apply pricing logic based on expiry date
exports.applyPricingLogic = (req, res) => {
    const foodData = readFoodData();
    const currentDate = new Date();

    foodData.forEach(item => {
        const expiryDate = new Date(item.expiryDate);
        const timeDifference = expiryDate.getTime() - currentDate.getTime();
        const daysUntilExpiry = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysUntilExpiry <= 1) {
            item.price -= 1.00;
        } else if (daysUntilExpiry <= 2) {
            item.price -= 0.50;
        }
    });

    writeFoodData(foodData);
    res.json(foodData);
};
