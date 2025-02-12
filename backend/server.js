const express = require('express');
const app = express();

const mockData = require("./mockData");  // Import the mock data

const PORT = process.env.PORT || 3000;

// Define an API route that returns mock data
app.get("/items", (req, res) => {
    res.json(mockData);  // Send the mock data as a response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
