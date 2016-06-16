
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost:27017/test');

var memoSchema = new mongoose.Schema({
  authId:  String,
  memoId: String,
  title:   String,
  memo: String,
  createDate: { type: Date, default: Date.now }
});

var scheduleSchema = new mongoose.Schema({
  memoId: String,
  nextSendTime: Date,
  iteration: Number
});


var userSchema = new mongoose.Schema({
  authId: String,
  pushId: String,
  profileInfo: Schema.Types.Mixed
});

//compile schema to model
var Memo = db.model('memo', memoSchema);
var Schedule = db.model('schedule', scheduleSchema);
var User = db.model('user', userSchema);

console.log("Created model");
