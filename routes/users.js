var express = require('express');
var router = express.Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var dbaccess=require('../routes/dbaccess.js');
var URL = 'mongodb://sa:test123@localhost:27017/admin';
//var index = require('./routes/index');
/* GET users listing. */
router.get('/', function(req, res, next) {
  var dbi=new dbaccess();
  var text=dbi.getData("addline1",function(err,data)
  {
  if (err) {
                console.log(err);
                return err;
            } else {
               console.log(data);
                res.json( data);
               
            }
  });
  //console.log(text);
//res.json(text);
// MongoClient.connect(URL, function(err, database) {
//   if (err) {
//   res.send(err);
//   return;
//   }
// var database2 = database.db("customer");
//   var collection = database2.collection('address');
//   collection.find({}).toArray(function(err,data)
//   {
//   if (err) {
//                 console.log(err);
//                 return res(err);
//             } else {
               
//                 return res.json(data);
//             }
//   }
//   );

   
//   database2.close();
//   database.close();
// });
  
  
  //res.send('sample responce for users');
});

module.exports = router;
