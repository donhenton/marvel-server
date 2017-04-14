module.exports = function (config) {

    var api = require('marvel-api');
    var marvelService = {};
    var marvelClient = api.createClient(
            {publicKey: config.publicKey,
                privateKey: config.privateKey
            });

    marvelService.createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };



    marvelService.findByName = function (name)
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

    marvelService.randomCharacters = function (name)
    {

        var count = 10;
        var offset = random(1, 1001);
        return marvelClient.characters.findAll(count, offset)


    }

    return marvelService;
}
