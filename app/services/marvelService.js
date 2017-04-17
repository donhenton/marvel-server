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


    var characterCache = [];

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
        var cK = Object.keys(characterCache);
     //   logger.debug("Keys " + JSON.stringify(cK))
        if (characterCache[offset])
        {
            //you are in the cache
      //      logger.debug("in the cache")
            foundData = characterCache[offset];
            var cacheHit = Q.defer();
            cacheHit.resolve(foundData);
            return cacheHit.promise;
        }

        foundData = marvelClient.characters.findAll(count, offset);
      //  logger.debug("inserting into the cache")
        characterCache[offset] = foundData;
        return foundData;


    }

    return marvelService;
}
