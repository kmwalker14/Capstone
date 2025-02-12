const express = require('express'); // Import express for building the server
const app = express(); // Create an express app instance

const mockData = require('./mockData');  // Import the mock data

// Set the port to environment variable or default to 10000
const PORT = process.env.PORT || 10000;

// Define root route
app.get('/', (req, res) => {
    res.send('Testing Backend API');
});

// Define items route to return mock data
app.get('/items', (req, res) => {
    res.json(mockData);  // Use mock data
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
