const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Bipin@Gosai0010',
    database: process.env.DB_NAME || 'login',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.code, err.message);
        process.exit(1);
    }
    console.log('Connected to the database!');
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Signup failed.' });
            } else {
                res.status(201).send({ message: 'User registered successfully.' });
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred during signup.' });
    }
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Login failed.' });
        } else if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
            res.status(200).send({ message: 'Login successful.' });
        } else {
            res.status(401).send({ message: 'Invalid credentials.' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
