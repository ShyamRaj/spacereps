var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var memo_create = require('./api/memo_create');
var memo_list = require('./api/memo_list');
var memo_delete = require('./api/memo_delete');
var memo_startover = require('./api/memo_startover');
var schedule_run_these = require('./api/schedule_run_these');
var token = require('./api/token');
var sender = require('./api/send-messages');

var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use('/api', router);
memo_create(router);
memo_list(router);
memo_delete(router);
memo_startover(router);
schedule_run_these(router);
token(router);
sender(router);

app.listen(3000);

console.log("Listening to PORT 3000");
