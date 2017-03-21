var dbaccess=function(){
var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb://sa:test123@localhost:27017/admin';
export function getData (name)
{
MongoClient.connect(URL, function(err, database) {
  if (err) {
  //res.send(err);
  return err;
  }
var database2 = database.db("customer");
  var collection = database2.collection('address');
  collection.find({}).toArray(function(err,data)
  {
  if (err) {
                console.log(err);
                return err;
            } else {
               
                return data;
            }
  }
  );

   
  database2.close();
  database.close();
});
  
}}

module.exports=dbaccess;
