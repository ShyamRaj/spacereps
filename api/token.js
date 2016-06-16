var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');

module.exports = function(router) {
    router.post("/token/:id", function (req, res) {

        var token = new data_store.Token({token: req.params.id});
        token.save(function (err, token) {
            if (err) {
                console.log('CANNOT SAVE TOKEN !!!!!!!!!!!!!!');
                res.json({
                    "error": true,
                    "message": "Token was not saved"
                });
            } else {
                console.log("Id of the token created, Creating schedule for ", token._id);
                res.json({error: false});
            }
        });
    });
};
