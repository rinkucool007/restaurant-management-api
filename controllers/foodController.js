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

// GET all food items with nutritional information
exports.getAllFood = (req, res) => {
    const foodData = readFoodData();
    res.json(foodData);
};

// GET food item by ID with nutritional details
exports.getFoodWithNutrition = (req, res) => {
    const foodData = readFoodData();
    const foodId = parseInt(req.params.id);
    const foodItem = foodData.find(item => item.id === foodId);

    if (foodItem) {
        res.json(foodItem);
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
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

// Check for items that are best before a certain number of days
exports.getBestBeforeDays = (req, res) => {
    const foodData = readFoodData();
    const today = new Date();
    const days = parseInt(req.query.days); // Get the number of days from the query parameters

    if (isNaN(days)) {
        return res.status(400).json({ message: "Please provide a valid number of days" });
    }

    const bestBeforeItems = foodData.filter(item => {
        const bestBeforeDate = new Date(item.bestBeforeDate);
        const diffTime = Math.abs(bestBeforeDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return diffDays <= days;
    });

    res.json({
        bestBeforeItems: bestBeforeItems,
        count: bestBeforeItems.length
    });
};


// Get quantity of items present in each category
exports.getQuantityByCategory = (req, res) => {
    const foodData = readFoodData();

    const categoryQuantities = foodData.reduce((acc, item) => {
        if (acc[item.category]) {
            acc[item.category] += item.quantity;
        } else {
            acc[item.category] = item.quantity;
        }
        return acc;
    }, {});

    res.json(categoryQuantities);
};
