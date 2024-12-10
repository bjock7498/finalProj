const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Replace with your password
  database: 'shamrock'  // Replace with your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Endpoint to fetch menu items
app.get('/api/menu-items', (req, res) => {
  db.query('SELECT * FROM menu_items', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch menu items' });
      return;
    }
    res.json(results);
  });
});

// Serve static files (your front-end HTML, CSS, and JS)
app.use(express.static('public'));  // Make sure your front-end files are in a "public" folder

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
