var Sequelize = require('sequelize');
var sequelize;

sequelize = new Sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite',
  'storage': __dirname + '/data/dev-final.sqlite'
});

var db = {};

// Initialize models
db.portfolio = sequelize.import(__dirname + '/models/portfolio.js');
db.company = sequelize.import(__dirname + '/models/company.js');
db.stock = sequelize.import(__dirname + '/models/stock.js');

// Relationships
db.stock.belongsTo(db.company);

// Initialize sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export
module.exports = db;
