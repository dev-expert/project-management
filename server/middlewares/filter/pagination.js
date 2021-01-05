var Sequelize = require ('sequelize');
module.exports = function(req,res,next) {
  const filter = {
      offset: parseInt(req.query.offset),
      limit: parseInt(req.query.limit),
    };
    req.filter = filter;

  next();
};