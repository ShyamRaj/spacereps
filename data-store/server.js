
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

//connect to database
var db = mongoose.connect('mongodb://192.168.99.100:27017/test');


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
