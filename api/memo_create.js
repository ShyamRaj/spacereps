var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');

router.post("/", function (req, res) {
    var memo2Bcreated = req.body;
    console.log("memo send", memo2Bcreated);
    var memo = new data_store.Memo(memo2Bcreated);
    memo.save(function(err){
      if(err) {
          console.log('CANNOT SAVE MEMO !!!!!!!!!!!!!!');
          res.json({
              "error": false,
              "message": "Hello World"
          });
      } else {
          console.log("memo success response", memo2Bcreated);
          memo2Bcreated.success = true;
          res.json(memo2Bcreated);
      }
    });
});

module.exports =  router;
