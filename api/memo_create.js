var express = require('express');
var router = express.Router();

router.post("/", function (req, res) {
    res.json({
        "error": false,
        "message": "Hello World"
    });
});

module.exports =  router;