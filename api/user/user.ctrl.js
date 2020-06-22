const models = require('../../models');

const index = async (req, res) => {
  req.query.limit = req.query.limit || 10;
  let limit = Number(req.query.limit);

  if (isNaN(limit)) return res.status(400).end();
  let users = await models.User.findAll({ limit });

  res.json(users.slice(0, limit));
};

const show = async (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  let user = await models.User.findOne({ where: { id } });
  if (!user) return res.status(404).end();
  res.json(user);
};

const destroy = async (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  await models.User.destroy({ where: { id } });
  res.status(204).end();
};

const create = async (req, res) => {
  let name = req.body.name;
  if (!name) return res.status(400).end();
  let userNameExists = await models.User.findOne({ where: { name } });
  if (userNameExists) return res.status(409).end();

  let user = await models.User.create({ name });
  res.status(201).json(user);
};

const update = async (req, res) => {
  let id = Number(req.params.id);
  let name = req.body.name;

  if (isNaN(id) || !name) return res.status(400).end();
  let user = await models.User.findOne({ where: { id } });
  if (!user) return res.status(404).end();
  let checkUserName = await models.User.findOne({ where: { name } });
  if (checkUserName) return res.status(409).end();

  user.name = name;
  await user.save();
  res.json(user);
};

module.exports = {
  index,
  show,
  destroy,
  create,
  update
};
