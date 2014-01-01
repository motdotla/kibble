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

var getNewAddress = function(fn) {
  client.getNewAddress(function(err, address) {
    if (err) { fn(err, null); }
    fn(null, address);
  });
};

var getAddressesByAccount = function(fn) {
  client.getAddressesByAccount('', function(err, addresses) {
    if (err) { fn(err, null); }
    fn(null, addresses);
  });
};

var getBalance = function(address, fn) {
  client.getBalance(address, function(err, balance) {
    if (err) { fn(err, null); }
    fn(null, balance);
  });
};


var so = {
  get_new_address: {
    handler: function(request) {
      getNewAddress(function(err, address) {
        if (err) { 
          request.reply({code: 500, error: err })
        }
        request.reply({code: 200, success: 'address successfully generated'});
      })
      
    }
  },
  get_addresses_by_account: {
    handler: function(request) {
      getAddressesByAccount(function(err, addresses) {
        if (err) {
          request.reply({code: 500, error: err})
        }
        request.reply({code: 200, accounts: addresses})
      })
    }
  },
  get_balance: {
    handler: function(request) {
      getBalance('', function(err, balance) {
        if (err) {
          request.reply({code: 500, error: err})
        }
        request.reply({code: 200, balance: balance})
      })
    }
  }
}



server.route({
  method  : 'GET',
  path    : '/so/get_new_address',
  config  : so.get_new_address
});


server.route({
  method  : 'GET',
  path    : '/so/get_addresses_by_account',
  config  : so.get_addresses_by_account
});

server.route({
  method  : 'GET',
  path    : '/so/get_balance',
  config  : so.get_balance
});

server.start(function() {
  console.log('Kibble server started at: ' + server.info.uri);
});
