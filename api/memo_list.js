var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');

module.exports = function(router) {
    router.get("/memo/list/:name", function (req, res) {
        data_store.Memo.find({}, function (err, memos) {
            if (err) {
                res.json({
                    "error": err
                });
            } else {
                res.json({
                    "error": false,
                    "authId": req.params.user,
                    "memos": memos
                });
            }
        });

    });
};

