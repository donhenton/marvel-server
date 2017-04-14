// Invoke 'strict' JavaScript mode
'use strict';
var url = require("url");
// Define the routes module' method
module.exports = function (app, deviantStoreService) {

    //dummyService is passed in express.js

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(deviantStoreService.createError(errorString, "ErrorClass"));
    };

    var getDataForUser = function (req, res)
    {


        var userId = parseInt(req.params.userId);
        deviantStoreService.getDataForUser(userId).then(function (data)
        {
            // console.log("items zzz "+JSON.stringify(data));
            res.json(data);
        }
        , function (err)
        {
            reportError(res, err.toString());
        });
    }

    app.get('/storage/getDataForUser/:userId', getDataForUser);


    app.put('/storage/persistData/:userId', function (req, res) {
        // console.log(req.body);
        var userId = parseInt(req.params.userId);
       // console.log("user id "+userId)
       // console.log(req.body)
        var error = function (err) {
            reportError(res, err.toString());
        };

        var success = function (result)
        {

            if (result.result.ok == 1)
            {

                //   console.log(result);
                if (result.result.n == 1)
                {
                    res.json({"ack":"OK"});
                } else
                {
                    var resVar = deviantStoreService.createError('Not Found',
                            "NotFoundClass");

                    res.status(404);
                    res.json(resVar);
                }


            } else
            {
                //console.log("in error handler "+result)
                //console.log(result);
                reportError(res, "error in success handler " + result.toString());
            }

        };



        deviantStoreService.persistData(userId, req.body).then(success, error);

    });



}


