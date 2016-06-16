var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var memo_create = require('./api/memo_create');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));



app.use('/api/memo', memo_create);

app.listen(3000);
console.log("Listening to PORT 3000");
