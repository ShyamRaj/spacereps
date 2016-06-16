var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');
var ObjectId = require('mongoose').Types.ObjectId;


router.get("/", function (req, res) {
    data_store.Memo.remove({_id: new ObjectId(req.params.id)}, function(err) {
    if (err) {
      res.json({
          "error": err,
          "message": "Unable to delete memo"
      });
    }
  });

  data_store.Schedule.remove({_id: new ObjectId(req.params.id)}, function(err) {
    if (err) {
      console.info("Removing schedule for " + memoId, err);
    }
  });

  res.json({
    "error": false
  });


});

module.exports =  router;
