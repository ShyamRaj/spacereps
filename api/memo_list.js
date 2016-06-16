var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');


router.get("/", function (req, res) {
    data_store.Memo.find({}, function(err, memos) {
    if (err) {
      res.json({
          "error": err
      });
    }

    res.json({
        "error": false,
        "authId": req.params.user,
        "memos": memos
    });

  });


});

module.exports =  router;
