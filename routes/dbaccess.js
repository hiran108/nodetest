var express = require("express");

var dbaccess=function(appx)
{

var self = this;
var MongoClient = require('mongodb').MongoClient;


self.searchCustomer= function (name,adata)
  {
    
    MongoClient.connect(appx.get('dbconnection'), function(err, database) {
      if (err) {
      console.log(err);
      return err;
      }
    var database2 = database.db("customer");
      var collection = database2.collection('address');
      collection.find({line1:name}).toArray(adata);

      
      database2.close();
      database.close();
    });


    
  }
}

module.exports=dbaccess;
