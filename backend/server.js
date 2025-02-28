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
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "https://asu-capstone.onrender.com",
    "http://localhost:8080/"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

app.use(express.json()); // Ensure JSON body parsing


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,  // Wait 10s before failing
    acquireTimeout: 10000,  // Wait 10s before failing
    reconnect: true
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
        console.log("🔹 Incoming Request Body:", req.body);

        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        let retries = 3;  // Retry 3 times if there's a failure
        while (retries > 0) {
            try {
                const query = "INSERT INTO insideasu (content) VALUES (?)";
                await db.query(query, [content]);
                console.log("✅ Content saved successfully");
                return res.status(201).json({ message: "Content saved successfully" });
            } catch (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST' && retries > 0) {
                    console.warn("⚠️ Lost connection to database, retrying...");
                    retries--;
                } else {
                    throw err;
                }
            }
        }
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
});


setInterval(async () => {
    try {
        const connection = await db.getConnection();
        await connection.query("SELECT 1"); // Keeps MySQL connection alive
        connection.release();
        console.log("✅ Database keep-alive ping successful");
    } catch (err) {
        console.error("❌ Database keep-alive failed:", err);
    }
}, 300000); // Runs every 5 minutes (300,000 ms)



db.on("error", (err) => {
    console.error("❌ Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("🔄 Attempting to reconnect...");
    }
});
module.exports = db;

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
