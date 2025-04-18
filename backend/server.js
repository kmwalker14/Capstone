require('dotenv').config(); // Load .env variables
const multer = require('multer');
const path = require('path');
const fs = require("fs");

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

// Multer setup: Store files in 'uploads/' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Files will be saved in "uploads/" folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Unique filename
    }
});
const upload = multer({ storage });


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

app.put('/admins', async (req, res) => {
    let connection;
    try {
        const { id, firstname, lastname, username, email } = req.body;

        if (!id || !firstname || !lastname || !username || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        connection = await db.getConnection();

        const updateQuery = `UPDATE admins SET firstname = ?, lastname = ?, username = ?, email = ? WHERE id = ?`;

        const [result] = await connection.query(updateQuery, [firstname, lastname, username, email, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        console.log(`✅ Admin  ${firstname} updated successfully`);
        res.status(200).json({ message: "Admin updated successfully" });

    } catch (err) {
        console.error("❌ Error updating admin:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});


app.delete('/admins', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "Admin ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM admins WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

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

app.post('/api/teaching', async (req, res) => {
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

        const query = "INSERT INTO teaching (content) VALUES (?)";
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

app.get('/api/teaching', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM teaching ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/teaching/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE teaching SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/teaching', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM teaching WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/publications', async (req, res) => {
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

        const query = "INSERT INTO publications (content) VALUES (?)";
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

app.get('/api/publications', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM publications ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/publications/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE publications SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/publications', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM publications WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/research', async (req, res) => {
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

        const query = "INSERT INTO research (content) VALUES (?)";
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

app.get('/api/research', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM research ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/research/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE research SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/research', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM research WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
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

app.get('/api/insideasu', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM insideasu ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/insideasu/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE insideasu SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/insideasu', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM insideasu WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/outsideasu', async (req, res) => {
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

        const query = "INSERT INTO outsideasu (content) VALUES (?)";
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

app.get('/api/outsideasu', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM outsideasu ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/outsideasu/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE outsideasu SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/outsideasu', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM outsideasu WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/mentorfaculty', async (req, res) => {
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

        const query = "INSERT INTO mentorfaculty (content) VALUES (?)";
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

app.get('/api/mentorfaculty', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM mentorfaculty ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/mentorfaculty/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE mentorfaculty SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/mentorfaculty', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM mentorfaculty WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/mentorstudents', async (req, res) => {
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

        const query = "INSERT INTO mentorstudents (content) VALUES (?)";
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

app.get('/api/mentorstudents', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM mentorstudents ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/mentorstudents/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE mentorstudents SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/mentorstudents', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM mentorstudents WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/workhistory', async (req, res) => {
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

        const query = "INSERT INTO workhistory (content) VALUES (?)";
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

app.get('/api/workhistory', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM workhistory ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/workhistory/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE workhistory SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/workhistory', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM workhistory WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

app.post('/api/tools', async (req, res) => {
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

        const query = "INSERT INTO tools (content) VALUES (?)";
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

app.get('/api/tools', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, content FROM tools ORDER BY id DESC");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

app.put('/api/tools/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const connection = await db.getConnection();
        const query = "UPDATE tools SET content = ? WHERE id = ?";
        const [result] = await connection.query(query, [content, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.delete('/api/tools', async (req, res) => {
    let connection;
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        connection = await db.getConnection();

        const deleteQuery = "DELETE FROM tools WHERE id = ?";
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        console.log(`✅ Content with ID ${id} deleted successfully`);
        res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting content:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
});


// Get Homepage Profile API route
app.get('/api/profile', async (req, res) => {
    try {
        const [results] = await db.query("SELECT id, about, education, office_hours, name, email, imageUrl FROM homepage");
        // Send the profile data as a response
        res.json(results); // Assuming you want to fetch only one record (adjust as necessary)
    } catch (err) {
        // Send an error message if something goes wrong
        res.status(500).json({ message: "Database error", error: err.message });
    }
});


// POST route to save professor profile data
app.post('/api/profile', async (req, res) => {
    let connection;
    try {
        console.log("🔹 Incoming Request Body:", req.body);

        const { about, education, office_hours, name, email, imageUrl } = req.body;
        
        if (!about || !education || !office_hours) {
            console.error("❌ Error: Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Get a new connection
        connection = await db.getConnection();

        const query = 'UPDATE homepage SET about = ?, education = ?, office_hours = ?, name = ?, email = ?, imageUrl = ? WHERE id = 1';
        await connection.query(query, [about, education, office_hours, name, email, imageUrl]);

        console.log("✅ Professor Profile saved successfully");
        res.status(201).json({ message: "Professor Profile saved successfully" });

    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    } finally {
        if (connection) connection.release();  // Ensure connection is always released
    }
});



// Upload file and save path in MySQL
app.post("/upload", upload.single("file"), async (req, res) => {
    let connection;
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { originalname, filename } = req.file;
        const filepath = `/uploads/${originalname}`; // Store relative path

        connection = await db.getConnection();

        // Insert file details into the database
        const query = "INSERT INTO files (filename, filepath) VALUES (?, ?)";
        const [result] = await db.query(query, [originalname, filepath]);

        // Return the relative file URL after insertion
        res.json({ id: result.insertId, filename: originalname, url: filepath });

    } catch (err) {
        // Handle any error that occurs during file upload
        console.error("Error uploading file:", err);
        res.status(500).json({ error: "Server error during file upload", details: err.message });
    } finally {
        if (connection) connection.release();
    }
});



// Route to get all files
app.get("/files", async (req, res) => {
    try {
        const [results] = await  db.query("SELECT id, filename, filepath FROM files");
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }   
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


setInterval(async () => {
    try {
        const connection = await db.getConnection();
        await connection.query("SELECT 1");
        connection.release();
        console.log("✅ Database keep-alive successful");
    } catch (err) {
        console.error("❌ Database keep-alive failed:", err);
    }
}, 300000); // Runs every 1 minute


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



