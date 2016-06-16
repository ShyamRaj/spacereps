var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');

module.exports = function(router) {
    router.get("/memo/list/:name", function (req, res) {
        console.info('finding ' + req.params.name);
        data_store.Memo.find({authId: req.params.name}, function (err, memos) {
            if (err) {
                res.json({
                    "error": err
                });
            } else {
                res.json({
                    "error": false,
                    "authId": req.params.name,
                    "memos": memos
                });
            }
        });

    });
};
