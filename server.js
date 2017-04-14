// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//console.log("env is "+process.env.NODE_ENV)
// Load the 'express' module
var express = require('./config/express');
var config = require('./config/config');
// Create a new Express application instance
var app = express();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
//var daoService = 
//  require('./app/daos/restaurantdao.server.js')(config);
var json3 = require('json3');

// Use the Express application instance to listen to the '3000' port

var portVar = 3000;
if (process.env.NODE_ENV === 'production') {
    portVar = process.env.PORT;
}  
server.listen(portVar);
// Log the server status to the console
console.log('Server running at http://localhost:' + portVar+" ("+process.env.NODE_ENV+")");

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;