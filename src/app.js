const express = require('express');
const path = require('path');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = app;
