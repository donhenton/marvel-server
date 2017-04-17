var log4js = require('log4js');
var logger = log4js.getLogger('rest.routes');
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



    var findAllCharacters = function (req, res)
    {
        var count = 10;
        var offset = req.query.offset;
        if (!offset)
        {
            offset = 0;
        }
        
        logger.debug("offset is "+offset)
        
        marvelService.findAllCharacters(count,offset).then(function (data)
        {
            res.json(simplifyData(data,'portrait_medium'));
        }


        ).fail(function (err)
        {
            reportError(res, JSON.stringify(err));
        }).done();
    }


    var findCharacterByName = function (req, res)
    {


        var name = req.query.name;


        marvelService.findCharcterByName(name).then(function (data)
        {


            res.json(data);
        }


        ).fail(function (err)
        {
            reportError(res, JSON.stringify(err));
        }).done();
    }


    app.get(['/api/characters/findByName'],findCharacterByName);
    app.get(['/api/characters/findAll'], findAllCharacters);

};



 