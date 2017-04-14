var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = function (err, req, res, next) {

    var m = "";
    if (err.clientMessage)
    {
        m = err.clientMessage;

    }
    var stack = "";
    if (err.stack)
    {
        stack = JSON.stringify(err.stack);
        m = "stacktrace error";
    }
    res.render('errorhandling/errorPage', {
        title: 'Error Page',
        message: m,
        stack: stack
    });



}
