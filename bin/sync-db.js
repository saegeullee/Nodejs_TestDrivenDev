const models = require('../models');

// force: true 기존에 DB가 있더라도 다 날리고 다시 새로 만든다는 의미

module.exports = () => {
  return models.sequelize.sync({ force: true });
};
