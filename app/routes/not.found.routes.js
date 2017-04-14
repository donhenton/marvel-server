var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = function (app) {

    var path = require('path'); 
    //rendering functions must define these first ////////////////////////////

    var notFoundRender = function (req, res) {

    
        res.render('errorhandling/notfound', {
            title: 'Not Found' ,
            pageRequested: req.originalUrl
        });

    };
    
     
   
    
    
    
///////////////////////////////////////////////////////////////////////
// routes
///////////////////////////////////////////////////////////////////////
        app.get('*', notFoundRender);
        

}