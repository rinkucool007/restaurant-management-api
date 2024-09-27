const express = require('express');
const foodRoutes = require('./routes/foodRoutes');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files from /images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use food routes
app.use('/api/food', foodRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
