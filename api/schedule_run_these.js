var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');


router.post("/", function (req, res) {
    data_store.Scedule.find({ "nextSendTime": { $lt: Date.now}}, function (err, schedules) {
      if (err) {
        res.json({error: err});
      }

      res.json(
        {
          "error", false,
          scedules: schedules
        });
    });
  });


});

module.exports =  router;
