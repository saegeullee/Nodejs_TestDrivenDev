const express = require('express');
const app = express();
const morgan = require('morgan');

const port = 3001;

let users = [
  { id: 1, name: 'alice' },
  { id: 1, name: 'alice' },
  { id: 1, name: 'alice' }
];

app.use(morgan('dev'));
app.get('/users', (req, res) => res.json(users));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
