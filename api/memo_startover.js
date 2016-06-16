var express = require('express');
var data_store = require('../data-store/server');

module.exports = function(router) {
    router.get("/memo/startover/:memoId", function (req, res) {
        var memo = new data_store.Schedule(req.body);
        memo.save(function (err) {
            if (err) {
                console.log('CANNOT STARTOVER THE MEMO!!!');
                res.json({
                    "error": false,
                    "message": "There was an error in starting over"
                });
            } else {
                res.json({
                    memoId: req.params.memoId,
                    nextSendTime: Date.now(),
                    iteration: 0
                });
                console.log("memo success response");
            }
        });
    });
}