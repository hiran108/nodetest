var express = require('express');
var router = express.Router();
var path = require('path');
var dbaccess = require('../DB/dbaccess.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'hiranpostestapp';
jwtOptions.passReqToCallback='true';
var strategy = new JwtStrategy(jwtOptions, function (req,jwt_payload, next) {
    //console.log(req);
      var dbi = new dbaccess(req.app);
    // usually this would be a database call:
    var user = dbi.checkToken(jwt_payload.username, req.connection.remoteAddress, function (err, data) {
            if (err) {
                next(null, false);
            }
            else if (!data) {
                next(null, false);
            }
            else {
                next(null, data[0]);
            }
    
    });
});

passport.use(strategy);
//var index = require('./routes/index');
/* GET users listing. */
router.get('/', function (req, res, next) {
    
    var dbi = new dbaccess(req.app);
    // console.log(JSON.stringify(req.headers));
    if (req.query.name && req.query.password) {
        var name = req.query.name;
        var password = req.query.password;
        var user = dbi.checkUser(name, password, function (err, data) {
            if (err) {
                res.status(401).json({ message: "Error on server" });
            }
            else if (!data) {
                res.status(401).json({ message: "no such user found" });
            }
            else {
                console.log(data);
                var payload = { username:data[0].username };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                dbi.addToken(name, token,req.connection.remoteAddress, function (err, data) {
                    if (err) {
                        res.status(401).json({ message: "Error on server" });
                    }
                    else {
                        res.json({ message: "ok", token: token });
                    }
                }
                );


            }
        });

    }
    else {
        res.status(401).json({ message: "login required" });
    }
    // usually this would be a database call:





});

module.exports = router;
