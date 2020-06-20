let users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'hyuna' },
  { id: 3, name: 'louies' }
];

const index = function(req, res) {
  req.query.limit = req.query.limit || 10;
  let limit = Number(req.query.limit);

  if (isNaN(limit)) {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
};

const show = function(req, res) {
  let id = Number(req.params.id);

  if (isNaN(id)) res.status(400).end();
  let user = users.filter(e => e.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
};

const destroy = function(req, res) {
  let id = Number(req.params.id);

  if (isNaN(id)) return res.status(400).end();

  let idx = users.findIndex(e => e.id === id);
  if (idx !== -1) {
    users.splice(idx, idx + 1);
    res.status(204).end();
  }
};

const create = function(req, res) {
  let name = req.body.name;
  if (!name) return res.status(400).end();
  let userNameExists = users.filter(e => e.name === name);
  if (userNameExists.length) return res.status(409).end();

  let newId = users[users.length - 1].id + 1;
  let user = { id: newId, name: name };
  users.push(user);
  res.status(201).json(user);
};

const update = function(req, res) {
  let id = Number(req.params.id);
  let name = req.body.name;

  console.log(users);
  let userByName = users.filter(e => e.name === name)[0];
  if (userByName) return res.status(409).end();

  if (isNaN(id) || !name) return res.status(400).end();

  let user = users.filter(e => e.id === id)[0];
  if (!user) return res.status(404).end();
  user.name = name;
  res.json(user);
};

module.exports = {
  index,
  show,
  destroy,
  create,
  update
};
