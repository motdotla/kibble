var dotenv      = require('dotenv');
dotenv.load();

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

var v0 = {
  generate_address: {
    handler: function(request) {
      // put code here to generate address
      request.reply({code: 200});
    }
  }
}

server.route({
  method  : 'GET',
  path    : '/so/v0/generate_address',
  config  : v0.generate_address
});

server.start(function() {
  console.log('Kibble server started at: ' + server.info.uri);
});
