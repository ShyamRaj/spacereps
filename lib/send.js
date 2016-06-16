var request = require('request');

function send(id, cb) {
  var options = {
    method: 'POST',
    url: 'https://gcm-http.googleapis.com/gcm/send',
    headers: {
      'Authorization': 'key=AIzaSyAisrPTCOiOgzX_uZ9hdp8GogvWzZ25wWo',
      'Content-Type': 'application/json'
    },
    json: true,
    body: {
      "to": id
    }
  };

  request(options, function(err, res, body) {
    return cb(err, body);
  });
}

module.exports = send;
// send('<id goes here>',
// function(err, body) {
//   console.log(err, body);
// });
