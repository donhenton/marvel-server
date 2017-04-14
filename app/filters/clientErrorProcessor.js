var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = function (err, req, res, next) {

    if (typeof err === "object" && err["fromErrorClient"])
    {
      
        ////// res.status(500).send(newMessage); //this sends it out to the page itself
        err.clientMessage = err.error + " (clientErrorHandler addition)";

    } 
     next(err); //just pass it on
}
