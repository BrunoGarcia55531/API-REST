const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database('./products.db', err => {
  if (err) console.error(err.message);
  else console.log('Connected to the products database.');
});

app.use(express.json());

app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else {
      res.json(rows);
    }
  });
});

app.get('/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else if (!row) {
      res.status(404).send('Product not found');
    } else {
      res.json(row);
    }
  });
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  db.run('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json({ id: this.lastID, name, price });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
