// filepath: c:\Users\Admin\Documents\GitHub\every-calculator\server.js
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('www'));

app.post('/api/settings', (req, res) => {
  console.log('Received settings:', req.body);
  fs.writeFile('settings.json', JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Error saving settings');
    res.send('Settings saved!');
  });
});

app.get('/api/settings', (req, res) => {
  fs.readFile('settings.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading settings');
    res.json(JSON.parse(data));
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));