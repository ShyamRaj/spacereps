var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var memo_create = require('./api/memo_create');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use('/api/memo', memo_create);

app.listen(3000);
//data_store.Memo.find({authId: 'test'}).exec(function(err, memo){
//    if(err) {
//        console.log("ERRRROR RETRIEVEING",err);
//    } else {
//        console.log("MEMO", memo);
//    }
//});
console.log("Listening to PORT 3000");
