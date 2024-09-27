const express = require('express');
const foodRoutes = require('./routes/foodRoutes');

const app = express();
app.use(express.json());

// Serve static images
app.use('/images', express.static('images'));

// Use food routes
app.use('/api/food', foodRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
