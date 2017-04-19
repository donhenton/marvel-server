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


    var simplifyCharacterData = function (data, portraitSize)
    {
        var returnedData = [];
        data.data.forEach(function (d)
        {
            var imgData = null;
            if (d.thumbnail && d.thumbnail.path && d.thumbnail.extension)
            {
                imgData = (d.thumbnail.path + "/" + portraitSize + "." + d.thumbnail.extension)
            }
            var p = {"name": d.name, 'imageUrl': imgData, id: d.id,urls:d.urls}
            returnedData.push(p);
        });

        return returnedData;

    }



    var findAllCharacters = function (req, res)
    {
        var count = 12;
        var offset = 0;
        var dir = req.query.dir;
      //  logger.debug("check offset "+JSON.stringify(req.session['offsets']))
        if (req.session['offsets'] === undefined)
        {
            req.session['offsets'] = {'characters': 0};
          //  logger.debug("did the offset")
        }
        var isOkay = false;
        if (!dir)
        {
            isOkay = true;
        }
        if (dir == 'prev')
        {
            offset = req.session.offsets['characters'] - count;
            if (offset < 0)
            {
                offset = 0;
            }
            isOkay = true;
        }
        if (dir === 'next')
        {
            offset = req.session.offsets['characters'] + count;
            isOkay = true;
            
        }
        if (!isOkay)
        {
            throw new Error("next or prev only for characters/findAll")
        }
        // logger.debug("session "+JSON.stringify(req.session))
        req.session.offsets['characters'] =   offset ;
      //  logger.debug("offset is " + offset)

        marvelService.findAllCharacters(count, offset,req).then(function (data)
        {
            var payload = {data: simplifyCharacterData(data, 'portrait_medium'), offset:offset,count: count,total: data.meta.total};
            
            res.json(payload);
        }


        ).fail(function (err)
        {
            reportError(res, JSON.stringify(err));
        }).done();
    }

////comic data //////////////////////////////////////////////////////////////
    
    var simplifyComicData = function(data)
    {
        var returnedData = [];
        data.data.forEach(function (d)
        {
            
            var imgData = null;
            if (d.thumbnail && d.thumbnail.path && d.thumbnail.extension)
            {
                imgData = (d.thumbnail.path + "/portrait_xlarge." + d.thumbnail.extension)
            }
            var p = {"title": d.title, 
                 price: d.prices[0],
                'description':d.description,
                'date': d.dates[0].date,
                'thumbnail':imgData ,
                id: d.id }
            returnedData.push(p);
        });

        return returnedData;
    }
    
    var findComicsForCharacter = function (req, res,next)
    {
        var characterId = req.params['characterId'];
        
        marvelService.findComicsForCharacter(characterId).then(function (data)
        {
            var payload = {count: data.meta.count,data: simplifyComicData(data)};
            
            res.json(payload);
        }


        ).fail(function (err)
        {
            reportError(res, JSON.stringify(err));
        }).done();
        
    }


    app.get(['/api/characters/:characterId/comics'], findComicsForCharacter);
    app.get(['/api/characters/findAll'], findAllCharacters);

};



 