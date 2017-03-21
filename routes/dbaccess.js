var express = require("express");

var dbaccess=function(){
   var self = this;
var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb://sa:test123@localhost:27017/admin';
self.getData= function (name,adata)
{
  var res='tr';
MongoClient.connect(URL, function(err, database) {
  if (err) {
  console.log(err);
  return err;
  }
var database2 = database.db("customer");
  var collection = database2.collection('address');
  collection.find({line1:name}).toArray(adata
  );

   
  database2.close();
  database.close();
});

return res;
  
}}

module.exports=dbaccess;
