const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>HOME</h1>');
});

app.get('/login', (req, res) => {
  res.send('login');
});

app.use((res, req) => {
  res.status(400).send('page not found');
});

app.listen(3000, () => {
  console.log('server listeniing...');
});
