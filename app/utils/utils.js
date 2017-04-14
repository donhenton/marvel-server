// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
var utils = function ()
{

    var utilObj = {};
    
    utilObj.reportError = function (error) {
        var message = 'In: ';
        var title = 'Error: ';

        if (error.description) {
            title += error.description;
        } else if (error.message) {
            title += error.message;
        }

        if (error.filename) {
            var file = error.filename.split('/');
            message += file[file.length - 1];
        }

        if (error.lineNumber) {
            message += '\nOn Line: ' + error.lineNumber;
        }
        return message;

    };
   
    
    return utilObj;
}

  module.exports = utils;