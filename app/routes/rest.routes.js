// Invoke 'strict' JavaScript mode
'use strict';
var url = require("url");
// Define the routes module' method
module.exports = function (app, marvelService) {

    //dummyService is passed in express.js

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(marvelService.createError(errorString, "ErrorClass"));
    }


    var simplifyData = function (data,portraitSize)
    {
        var returnedData = [];
        data.data.forEach(function (d)
        {
            var imgData = null;
            if (d.thumbnail && d.thumbnail.path && d.thumbnail.extension)
            {
                imgData = (d.thumbnail.path + "/"+portraitSize+"."+ d.thumbnail.extension)
            }
            var p = {"name": d.name, 'imageUrl': imgData,id: d.id}
            returnedData.push(p);
        });

        return returnedData;

    }



    var randomCharacters = function (req, res)
    {
        marvelService.randomCharacters().then(function (data)
        {
            res.json(simplifyData(data,'portrait_medium'));
        }


        ).fail(function (err)
        {
            reportError(res, JSON.stringify(err));
        }).done();
    }


    var processFindByName = function (req, res)
    {


        var name = req.query.name;


        marvelService.findByName(name).then(function (data)
        {


            res.json(data);
        }


        ).fail(function (err)
        {
            reportError(res, JSON.stringify(err));
        }).done();

    }


    app.get(['/api/findByName'], processFindByName);
    app.get(['/api/randomCharacters'], randomCharacters);

};



 