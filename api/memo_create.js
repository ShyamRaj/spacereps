var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');

module.exports = function(router) {
    router.post("/memo", function (req, res) {
        var memo2Bcreated = req.body;
        console.log("memo send", memo2Bcreated);
        var memo = new data_store.Memo(memo2Bcreated);
        memo.save(function (err, memo) {
            if (err) {
                console.log('CANNOT SAVE MEMO !!!!!!!!!!!!!!');
                res.json({
                    "error": true,
                    "message": "Memo was not saved"
                });
            } else {
                console.log("Id of the memo created, Creating schedule for ", memo._id);
                createFirstSchedule(memo._id, function(err, schedule){
                    if(err){
                        res.json({
                            "error": true,
                            "message": "Schedule was not saved"
                        });
                    } else {
                        memo.error = false;
                        res.json(memo);
                    }
                });

            }
        });
    });
};

function createFirstSchedule(memoId, callback){
    var schedule = new data_store.Schedule({
        memoId: memoId,
        nextSendTime: Date.now(),
        iteration: 0
    });
    schedule.save(function(err, schedule){
        callback(err, schedule)
    })
}
