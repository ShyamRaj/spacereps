var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');

module.exports = function(router) {
    router.post("/memo", function (req, res) {
        var memo2Bcreated = req.body;
        console.log("memo send", memo2Bcreated);
        var memo = new data_store.Memo(memo2Bcreated);
        memo.save(function (err) {
            if (err) {
                console.log('CANNOT SAVE MEMO !!!!!!!!!!!!!!');
                res.json({
                    "error": true,
                    "message": "Memo was not saved"
                });
            } else {
                console.log("memo success response", memo2Bcreated);
                memo2Bcreated.error = false;
                res.json(memo2Bcreated);
            }
        });
    });
};
