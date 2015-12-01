var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
  User: {
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: true}
  },
  Ware: {
    name: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String, required: true}
  },
  Cart: {
    user: {type: ObjectId, ref: 'User'},
    ware: {type: ObjectId, ref: 'Ware'},
    num: {type: Number, required: true}
  }
};