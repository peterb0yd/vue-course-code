var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
    name: DataTypes.STRING,
    shares: DataTypes.INTEGER
  }, {
    instanceMethods: {
      toPublicJSON: function() {
        var json = this.toJSON();
        return _.pick(json, 'name', 'shares', 'companyId', 'id');
      }
    }
  });
}
