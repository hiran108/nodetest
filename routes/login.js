var express = require('express');
var router = express.Router();
var path = require('path');
var dbaccess=require('../routes/dbaccess.js');
var _=require('lodash');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
//var index = require('./routes/index');
/* GET users listing. */
router.get('/', function(req, res, next) {
  var dbi=new dbaccess();
 // console.log(JSON.stringify(req.headers));
if(req.headers['name'] && req.headers['password']){
    var name = req.headers['name'];
    var password = req.headers['password'];
    var user = users[_.findIndex(users, {name: name})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }
else if(user.password === req.headers['password']) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    console.log(token);
    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }

  }
  else{
    res.status(401).json({message:"login required"});
  }
  // usually this would be a database call:
  

  

 
});

module.exports = router;
