require('dotenv').config(); // Load .env variables

const express = require('express'); // Import express for building the server
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // Create an express app instance

const mockData = require('./mockData');  // Import the mock data

// Set the port to environment variable or default to 10000
const PORT = process.env.PORT || 10000;
const SECRET_KEY = process.env.SECRET_KEY; // Change this to a strong secret

app.use(cors({ origin: "*" }));


app.use(bodyParser.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Change if necessary
    password: process.env.DB_PASSWORD, // Change if you set a password
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306

});

// Connect to MySQL
//db.connect(err => {
//    if (err) {
//        console.error('Database connection error:', err.message);
//       return;
//   }
//   console.log('Connected to MySQL Database');
//});
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Connected to MySQL Database');
        connection.release();
    } catch (err) {
        console.error('❌ Database connection error:', err.message);
    }
})();

// Hash passwords before storing in DB
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


// Get All Admins API route
app.get('/admins', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, first_name, last_name, username, email FROM admins");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.post('/api/insideasu', async (req, res) => {
    try {
        const { content } = req.body; // Get the content from request

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const query = "INSERT INTO insideasu (content) VALUES (?)"; // Adjust table name if different
        await db.query(query, [content]);

        res.status(201).json({ message: "Content saved successfully" });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
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
