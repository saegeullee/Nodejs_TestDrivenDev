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

  if (isNaN(limit)) {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  let id = Number(req.params.id);

  if (isNaN(id)) res.status(400).end();
  let user = users.filter(e => e.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
