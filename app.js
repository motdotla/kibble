var dotenv      = require('dotenv');
dotenv.load();

// Libraries
var changeCase  = require('change-case');
var commands    = require('./commands');
var dogecoin    = require('bitcoin');
var _           = require('underscore');

var e           = module.exports;
e.ENV           = process.env.NODE_ENV || 'production';

// Hapijs Server
var port        = parseInt(process.env.PORT) || 22556;
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

  var newargs = [];
  args.forEach(function(arg) {
    var number_as_float = parseFloat(arg);

    if (isNaN(number_as_float)) {
      newargs.push(arg);
    } else {
      newargs.push(number_as_float);
    }
  });

  return newargs;
}

function handleResponseThunk(request) {
  var ip = request.info.remoteAddress;
  console.log('Incoming request: ' + ip);
  return function(err, data) {
    if (err) { 
      request.reply({code: 500, error: err })
    }
     if ( ip == String(process.env.APP_IP)) {
		request.reply({code: 200, data: data});
	}
	else {
		request.reply({code: 404, error: 'not found'});
		console.log('request denied: ' + ip);
	}
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







