const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Check if the backend is working
app.get('/', (req, res) => {
    res.send('Backend is working :)');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
