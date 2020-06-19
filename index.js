const express = require('express');
const app = express();
const morgan = require('morgan');

const port = 3001;

let users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'hyuna' },
  { id: 3, name: 'louies' }
];

app.use(morgan('dev'));
app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  let limit = Number(req.query.limit);
  console.log(typeof limit);

  if (isNaN(limit) || typeof limit !== 'number') {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
