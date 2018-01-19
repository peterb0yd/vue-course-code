var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('portfolio', {
    available: DataTypes.DOUBLE,
    value: DataTypes.DOUBLE
  }, {
    instanceMethods: {
      toPublicJSON: function() {
        var json = this.toJSON();
        return _.pick(json, 'available', 'value', 'id');
      }
    }
  });
}
