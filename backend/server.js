const express = require('express'); // Import express for building the server
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // Create an express app instance

const mockData = require('./mockData');  // Import the mock data

// Set the port to environment variable or default to 10000
const PORT = process.env.PORT || 10000;
const SECRET_KEY = "CSE486Capstone"; // Change this to a strong secret

app.use(cors());
app.use(bodyParser.json());

// Enforce HTTPS
app.use((req, res, next) => {
    if (process.env.RENDER && req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if necessary
    password: 'CSE486Capstone', // Change if you set a password
    database: 'admin_db'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});


// Hash passwords before storing in DB
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT id, username, password, role FROM admins WHERE username = ?";
    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(401).json({ message: "Invalid Credentials" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    });
});


// Get All Admins
app.get('/admins', (req, res) => {
    db.query("SELECT id, username, role FROM admins", (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
    });
});

// Add a New Admin
app.post('/admins', async (req, res) => {
    const { username, password, role } = req.body;
    
    if (!username || !password || !role) return res.status(400).json({ message: "Missing fields" });

    const hashedPassword = await hashPassword(password);
    
    const query = "INSERT INTO admins (username, password, role) VALUES (?, ?, ?)";
    db.query(query, [username, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.status(201).json({ message: "Admin added successfully" });
    });
});


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
