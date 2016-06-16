var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');

router.post("/", function (req, res) {
    var schedule2Bcreated = {
        memoId: req.params.memoId,
        nextSendTime: req.params.nextSendTime,
        iteration: req.params.iteration
    }
    var schedule = new data_store.Schedule(schedule2Bcreated);
    schedule.save(function(err){
        if(err) {
            console.log('CANNOT CREATE SCHEDULE');
            res.json({
                "error": false,
                "message": "Error in creating schedule"
            });
        } else {
            console.log("created schedule",schedule);
            schedule2Bcreated.success = true;
            res.json(schedule2Bcreated);
        }
    });
});

module.exports =  router;
