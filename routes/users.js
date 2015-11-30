var express = require('express');
var Model = require('../db');
var router = express.Router();
var myUtil = require('../util');

router.post('/reg', function(req, res){
  var user = req.body;
  if(user.password != user.repassword){
    return res.json({code: 0, msg: '密码和重复密码不相等'});
  }
  delete user.repassword;
  user.password = myUtil.md5(user.password);
  user.avatar = 'https://secure.gravatar.com/avatar/'+myUtil.md5(user.email)+'?s=48';

  new Model('User')(user).save(function(err, user){
    if(err){
      return res.json({code: 0, msg: '保存数据库出错'});
    }
    req.session.user = user;
    return res.json({code: 1, user: user});
  });
});

router.post('/validate', function(req, res){
  var user = req.session.user;
  if(user){
    res.json({code: 1, user: user});
  }else {
    res.json({code: 0, user: {}});
  }
});

router.post('/logout', function(req, res){
  req.session.user = null;
  return res.json({code: 1, msg: '退出成功'});
});


module.exports = router;