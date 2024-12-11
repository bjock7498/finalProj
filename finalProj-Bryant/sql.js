const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shamrock'
});

app.post('/api/menu/add', (req, res) => {
    console.log('Received add request:', req.body);
    const { name, price, imageUrl, isAlcoholic } = req.body;
    connection.query('INSERT INTO menu_items (name, price, image_url, is_alcoholic) VALUES (?, ?, ?, ?)',
        [name, price, imageUrl, isAlcoholic],
        (err, result) => {
            if (err) {
                console.log('Database error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true, message: 'Item added successfully!' });
        });
});
app.post('/api/menu/remove', (req, res) => {
    const { itemName } = req.body;
    connection.query('DELETE FROM menu_items WHERE name = ?',
        [itemName],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true, message: 'Item removed' });
        });
});
app.post('/api/menu/update', (req, res) => {
    console.log('Update request received for:', req.body);
    const { itemName, newPrice } = req.body;
    connection.query('UPDATE menu_items SET price = ? WHERE name = ?',
        [newPrice, itemName],
        (err, result) => {
            if (err) {
                console.log('Database error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ success: true, message: `${itemName} price updated to ${newPrice}!` });
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
