var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//connect to database
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

//var memo1 = new Memo({
//  authId: 'test',
//  memoId: '-1',
//  title: 'initial check',
//  memo: 'fuck it'
//});
//
//memo1.save(function(err){
//  if(err) {
//    console.log('CANNOT SAVE MEMO !!!!!!!!!!!!!!');
//  }
//});

console.log("Created model");

module.exports = {
  db: db,
  Memo: Memo,
  Schedule: Schedule,
  User: User
};
