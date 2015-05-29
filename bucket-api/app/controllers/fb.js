// Load required packages
var request = require('request');

//by typo

exports.verify = function(token, callback) {
  var err = -1;
  var data;
  var path = "https://graph.facebook.com/me?"
              + "fields=id,birthday,gender,name,email,"
              + "picture.type(large),location &"
              + "access_token=" + token;
  request(path, function(error, response, body) {
    data = JSON.parse(body);
    if (!error && response && response.statusCode && response.statusCode == 200
        && typeof data.id !== "undefined" && typeof data.name !== "undefined"){
      callback(false, token, data);
    }
    else
      callback(true, token, data);
  }); 
}

