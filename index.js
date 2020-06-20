const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user/user');

const port = 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
