var express = require('express');
var data_store = require('../data-store/server');

module.exports = function(router){
    router.post("/memo/schedule/list", function (req, res) {
        data_store.Schedule.find({ "nextSendTime": { $lt: Date.now}}, function (err, schedules) {
          if (err) {
            res.json({error: err});
          } else {
              res.json({
                  "error": false,
                  scedules: schedules
              });
          }
        });
    });
};