var mongoose = require('mongoose'),
Schema = mongoose.Schema,
models = require('./models');

mongoose.connect(require('../settings').url);

mongoose.model('User', new Schema(models.User));

module.exports = function(type){
  return mongoose.model(type);
};