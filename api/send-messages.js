var express = require('express');
var router = express.Router();
var data_store = require('../data-store/server');
var send = require('../lib/send');
var async = require('async');

module.exports = function(router) {
  router.post("/send-all-messages", function (req, res) {
    console.log('sending messages');
    data_store.Token.find({}, function(err, tokens) {
      console.log('got tokens', tokens);
      var results = [];
      if(err) {
        return res.json({
          error: err
        });
      }
      if(tokens.length ===0 ) {
        return res.json({
          message: 'no token'
        })
      }
      async.each(tokens, function(token, cb) {
        console.log('sending: ', token.token);
        send(token.token, function(err, body) {
          console.log('got send result');
          results.push(body);
          return cb(err, body);
        })
      }, function(err) {
        return res.json({
          message: 'send tokens',
          tokens: tokens,
          error: err,
          results: results
        });
      })
    });
  });
};
