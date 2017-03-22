var express = require('express');
var router = express.Router();
var path = require('path');
var dbaccess=require('../routes/dbaccess.js');

router.get('/', function(req, res, next) 
    {
      var dbi=new dbaccess(req.app);
      var text=dbi.searchCustomer("addline1",function(err,data)
      {
      if (err) {
                    console.log(err);
                    return err;
                } else {
                  console.log(data);
                    res.json( data);
                  
                }
      });
    
    }
);

router.get('/test/', function(req, res, next) 
    {
     res.json("test call");
    
    }
);

module.exports = router;
