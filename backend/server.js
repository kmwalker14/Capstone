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
    origin: "*", // Temporarily allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

app.use(express.json()); // Ensure JSON body parsing

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "connect-src 'self' https://asu-capstone-backend.onrender.com https://asu-capstone.onrender.com;");
    next();
});


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
        const [results] = await db.query("SELECT id, firstname, lastname, username, email FROM admins");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});


app.post('/api/admins', async (req, res) => {
    let connection;
    try {
        console.log("🔹 Incoming Admin Data:", req.body);

        const { firstname, lastname, username, email } = req.body;

        // Ensure all fields are provided
        if (!firstname || !lastname || !username || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Get a database connection
        connection = await db.getConnection();

        // Check if username or email already exists in the database
        const checkQuery = "SELECT COUNT(*) AS count FROM admins WHERE username = ? OR email = ?";
        const [checkResult] = await connection.query(checkQuery, [username, email]);

        if (checkResult[0].count > 0) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        // Insert the new admin into the database
        const query = "INSERT INTO admins (firstname, lastname, username, email) VALUES (?, ?, ?, ?)";
        await connection.query(query, [firstname, lastname, username, email]);

        console.log("✅ New admin added successfully!");
        res.status(201).json({ message: "Admin added successfully" });

    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();  // Ensure connection is always released
    }
});

app.delete('/admins', async (req, res) => {
    let connection;
    try {
        const adminId = req.body;
        
        if (!adminId) {
            return res.status(400).json({ message: "Admin ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM admins WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [adminId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log(`✅ Admin with ID ${id} removed successfully`);
        res.status(200).json({ message: "Admin removed successfully" });

    } catch (err) {
        console.error("❌ Error removing admin:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});



app.post('/api/insideasu', async (req, res) => {
    let connection;
    try {
        console.log("🔹 Incoming Request Body:", req.body);

        const { content } = req.body;
        if (!content) {
            console.error("❌ Error: No content provided");
            return res.status(400).json({ message: "Content is required" });
        }

        // Get a new connection
        connection = await db.getConnection();

        const query = "INSERT INTO insideasu (content) VALUES (?)";
        await connection.query(query, [content]);

        console.log("✅ Content saved successfully");
        res.status(201).json({ message: "Content saved successfully" });

    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();  // Ensure connection is always released
    }
});



setInterval(async () => {
    try {
        const connection = await db.getConnection();
        await connection.query("SELECT 1");
        connection.release();
        console.log("✅ Database keep-alive successful");
    } catch (err) {
        console.error("❌ Database keep-alive failed:", err);
    }
}, 60000); // Runs every 1 minute


db.on("error", async (err) => {
    console.error("❌ Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("🔄 Attempting to reconnect...");
        db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
            waitForConnections: true,
            connectionLimit: 20,
            queueLimit: 0,
            connectTimeout: 10000,
        });
        console.log("✅ Reconnected to database.");
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
app.get('/ping-db', async (req, res) => {
    try {
        const connection = await db.getConnection();
        await connection.query("SELECT 1"); // Keep-alive query
        connection.release();
        res.status(200).send("✅ Database is alive");
    } catch (err) {
        console.error("❌ Database keep-alive failed:", err);
        res.status(500).send("❌ Database connection lost");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



