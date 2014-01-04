var dotenv      = require('dotenv');
dotenv.load();

// Libraries
var changeCase  = require('change-case');
var commands    = require('./commands');
var dogecoin    = require('bitcoin');
var _           = require('underscore');

var e           = module.exports;
e.ENV           = process.env.NODE_ENV || 'development';

// Hapijs Server
var port        = parseInt(process.env.PORT) || 3000;
var Hapi        = require('hapi');
var server      = new Hapi.Server(+port, '0.0.0.0', { cors: true });

var bitclient = new dogecoin.Client({
  host: process.env.DOGE_HOST,
  port: process.env.DOGE_PORT,
  user: process.env.DOGE_USER,
  pass: process.env.DOGE_PASS
});

function arrayifyArgsFromQuery(query) {
  var args = [];
  if (query.args) {
    args = query.args.split(","); 
  }

  return args;
}

function handleResponseThunk(request) {
  return function(err, data) {
    if (err) { 
      request.reply({code: 500, error: err })
    }

    request.reply({code: 200, data: data});
  }
}

_.each(commands, function(value, cmd) {
  var config = {
    handler: function(request) {
      var args    = arrayifyArgsFromQuery(request.query);
      var handler = handleResponseThunk(request);

      args.push(handler);
      bitclient[cmd].apply(bitclient, args);
    }
  }

  server.route({
    method  : 'GET',
    path    : '/so/'+changeCase.snakeCase(cmd),
    config  : config
  });
});

server.start(function() {
  console.log('Kibble server started at: ' + server.info.uri);
});
