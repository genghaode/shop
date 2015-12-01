var express = require('express');
var router = express.Router();
var Model = require('../db');

router.get('/list', function(req, res){
  Model('Cart').find({}).populate('user').populate('ware').exec(function(err, carts){
    if(err){
      return res.json({code: 0, msg: '查询出错'});
    }
    return res.json({code: 1, carts: carts});

  });
});

router.get('/delete/:_id', function(req, res){
  Model('Cart').remove({_id: req.params._id}, function(err, carts){
    if(err){
      return res.json({code: 0, msg: '数据库删除失败'});
    }
    return res.json({code: 1, msg: '删除成功'});
  });
});

module.exports = router;
