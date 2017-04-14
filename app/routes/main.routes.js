var express = require('express');
//var router = express.Router();
var passport = require('passport');



module.exports = function (app, passport) {



 
    var indexRender = function (req, res) {



        // the main login page
        res.render('index', {
            title: 'Main'
        });

    };

    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/', indexRender); //login page
    
 
 


}




