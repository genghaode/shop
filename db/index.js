var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('./models');

mongoose.connect(require('../settings').url);

mongoose.model('User', new Schema(models.User));
mongoose.model('Ware', new Schema(models.Ware));
mongoose.model('Cart', new Schema(models.Cart));

module.exports = function(type){
  return mongoose.model(type);
};