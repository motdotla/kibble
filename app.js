var dotenv      = require('dotenv');
dotenv.load();
var dogecoin = require('bitcoin');

// Libraries
var redis       = require('redis');

var e           = module.exports;
e.ENV           = process.env.NODE_ENV || 'development';

// Constants
var REDIS_URL               = process.env.REDIS_URL || process.env.REDISTOGO_URL || "redis://localhost:6379";

// Database
var redis_url   = require("url").parse(REDIS_URL);
var db          = redis.createClient(redis_url.port, redis_url.hostname);
if (redis_url.auth) {
  db.auth(redis_url.auth.split(":")[1]); 
}

var port        = parseInt(process.env.PORT) || 3000;
var Hapi        = require('hapi');
server          = new Hapi.Server(+port, '0.0.0.0', { cors: true });



var client = new dogecoin.Client({
  host: process.env.DOGE_HOST,
  port: process.env.DOGE_PORT,
  user: process.env.DOGE_USER,
  pass: process.env.DOGE_PASS
});


var generateAddress = function (fn) {
  client.getNewAddress(function(err, address) {
    if (err) { fn(err, null); }
    fn(null, address);
  });
};


var so = {
  generate_address: {
    handler: function(request) {
      generateAddress(function(err, address) {
        if (err) { 
          request.reply({code: 500, error: err })
        }
        request.reply({code: 200});
      })
      
    }
  }
}



server.route({
  method  : 'GET',
  path    : '/so/generate_address',
  config  : so.generate_address
});

server.start(function() {
  console.log('Kibble server started at: ' + server.info.uri);
});
