var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var memo_create = require('./api/memo_create');
var memo_list = require('./api/memo_list');
var memo_delete = require('./api/memo_delete');
var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use('/api', router);
memo_create(router);
memo_list(router);
memo_delete(router);
//app.use('/api/memo', memo_create);
//app.use('/api/memo/list/:name', memo_list);
//app.use('/api/memo/delete/:id', memo_delete);

app.listen(3000);

console.log("Listening to PORT 3000");
