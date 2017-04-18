var log4js = require('log4js');
var logger = log4js.getLogger('marvelService');

module.exports = function (config) {

    var api = require('marvel-api');
    var Q = require('q');
    var marvelService = {};
    var marvelClient = api.createClient(
            {publicKey: config.publicKey,
                privateKey: config.privateKey
            });


    var characterPageCache = [];
    var individualCharacterCache = {};
    var comicCache = {};


    marvelService.createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };



    marvelService.findCharacterByName = function (name)
    {

        return marvelClient.characters.findByName(name)


    }
    /**
     * 
     * @param {type} low included
     * @param {type} high excluded
     * @returns {Number}
     */
    function random(low, high) {
        return Math.random() * (high - low) + low;
    }

    marvelService.findAllCharacters = function (count, offset)
    {
        // logger.debug(`in findAllCharacters count ${count} offset ${offset}`)

        var foundData = [];
        //  var cK = Object.keys(characterPageCache);
        //   logger.debug("Keys " + JSON.stringify(cK))
        if (characterPageCache[offset])
        {
            //you are in the cache
            //      logger.debug("in the cache")
            foundData = characterPageCache[offset];
            var cacheHit = Q.defer();
            cacheHit.resolve(foundData);
            return cacheHit.promise;
        }

        foundData = marvelClient.characters.findAll(count, offset)
                .then(function (data)
                {
                    var t = JSON.parse(JSON.stringify(data['data']));
                      
                    //logger.debug(Array.isArray(t))
                   // logger.debug(JSON.stringify(data['data']))
                    characterPageCache[offset] = data;
                    
                    
                     t.forEach(function (d)
                     {
                       //  logger.debug("cache indiv " + d.id)
                         individualCharacterCache[d.id] = d;
                     })


                    return data;
                });
       // logger.debug("inserting into the cache")
        return foundData;


    }
    //defaults to offset 0 , limit 20
    
    marvelService.findComicsForCharacter = function(characterId)
    {
        var foundData = [];
        //  var cK = Object.keys(characterPageCache);
        //   logger.debug("Keys " + JSON.stringify(cK))
        if (comicCache[characterId])
        {
            //you are in the cache
            // logger.debug("in the cache for comics")
            foundData = comicCache[characterId];
            var cacheHit = Q.defer();
            cacheHit.resolve(foundData);
            return cacheHit.promise;
        }

        foundData = marvelClient.characters.comics(characterId)
                .then(function (data)
                {
                    
                    comicCache[characterId] = data;
                    return data;
                });
       // logger.debug("inserting into the cache")
        return foundData;

    }

    return marvelService;
}
