require('dotenv').config(); // Load .env variables

const express = require('express'); // Import express for building the server
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // Create an express app instance

const mockData = require('./mockData');  // Import the mock data

// Set the port to environment variable or default to 10000
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY; // Change this to a strong secret

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Change if necessary
    password: process.env.DB_PASSWORD, // Change if you set a password
    database: process.env.DB_NAME,
    port: process.env.PORT

});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err.message);
        return;
    }
    console.log('Connected to MySQL Database');
});


// Hash passwords before storing in DB
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


// Get All Admins API route
app.get('/admins', (req, res) => {
    const query = "SELECT id, first_name, last_name, username, email FROM admins";
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json(results);
    }); 
});

/*
// Define root route
app.get('/', (req, res) => {
    res.send('Testing Backend API');
});

// Define items route to return mock data
app.get('/items', (req, res) => {
    res.json(mockData);  // Use mock data
});

*/

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
