var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    instanceMethods: {
      toPublicJSON: function() {
        var json = this.toJSON();
        return _.pick(json, 'name', 'price', 'id');
      }
    }
  });
}
