var express = require('express');
//var router = express.Router();
var passport = require('passport');



module.exports = function (app, passport) {




    var deviantRender = function (req, res) {



        // the secured app page
        res.render('deviantapp', {
            title: 'DeviantArt Application',
            userId: 100,
            user: req.user
        });

    };
    var indexRender = function (req, res) {



        // the main login page
        res.render('index', {
            title: 'Login'
        });

    };

    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/', indexRender); //login page
    app.get('/main', passport.authenticationMiddleware(), deviantRender); // secured page


    /* Handle Login POST */
    app.post('/login', passport.authenticate('local', {

        failureRedirect: '/',
        successRedirect: '/main'
    }) )

//    use for debugging
//    
//     app.post('/login',function(req,res)
//    {
//       console.log(req.body) 
//        
//    })
//        


	/* Handle Logout */
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


}




