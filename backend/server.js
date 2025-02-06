const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Lethokuhle20',
  database: 'meals_database'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// API route to get all categories
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API route to get meals for a specific category
app.get('/api/meals/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  db.query('SELECT * FROM meals WHERE category_id = ?', [categoryId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
