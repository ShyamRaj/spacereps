var express = require('express');
var data_store = require('../data-store/server');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(router) {
    router.get("/memo/delete/:id", function (req, res) {
        console.log('ID to be deleted: ', req.params.id);
        data_store.Memo.remove({_id: new ObjectId(req.params.id)}, function (err) {
            if (err) {
                res.json({
                    "error": err,
                    "message": "Unable to delete memo"
                });
            } else {
                data_store.Schedule.remove({_id: new ObjectId(req.params.id)}, function (err) {
                    if (err) {
                        console.info("Removing schedule for " + memoId, err);
                        res.json({
                            "error": err,
                            "message": "Unable to delete schedules"
                        });
                    } else {
                        res.json({
                            "error": false
                        });
                    }
                });
            }
        });
    });
};
