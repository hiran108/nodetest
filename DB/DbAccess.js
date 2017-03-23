var express = require("express");

var dbaccess = function (appx) {

  var self = this;
  var MongoClient = require('mongodb').MongoClient;
  //var appx=appx;

  self.searchCustomer = function (name, adata) {

    MongoClient.connect(appx.get('dbconnection'), function (err, database) {
      if (err) {
        console.log(err);
        return err;
      }
      var database2 = database.db(appx.get('dbname'));
      var collection = database2.collection('Product');
      collection.find({ name: name }).toArray(adata);


      database2.close();
      database.close();
    });



  }

  self.checkUser = function (name, password, response) {

    MongoClient.connect(appx.get('dbconnection'), function (err, database) {
      if (err) {
        console.log(err);
        return err;
      }
      var database2 = database.db(appx.get('dbname'));
      var collection = database2.collection('Login');
      collection.find({ username: name, password: password }).toArray(response);


      database2.close();
      database.close();
    });



  }

  self.addToken = function (name, token, ip, response) {

    MongoClient.connect(appx.get('dbconnection'), function (err, database) {
      if (err) {
        console.log(err);
        return err;
      }
      var database2 = database.db(appx.get('dbname'));
      var collection = database2.collection('Token');
      collection.insert({ username: name, token: token, ip: ip }, response);


      database2.close();
      database.close();
    });



  }

  self.checkToken = function (name, ip, response) {

    MongoClient.connect(appx.get('dbconnection'), function (err, database) {
      if (err) {
        console.log(err);
        return err;
      }
      var database2 = database.db(appx.get('dbname'));
      var collection = database2.collection('Token');
      collection.find({ username: name, ip: ip }).toArray(response);


      database2.close();
      database.close();
    });



  }


}

module.exports = dbaccess;
