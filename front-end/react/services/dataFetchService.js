/* global postal */

import MarvelProxyService from './marvelProxyService';

class DataFetchService
{

    constructor()
    {

        var baseURL = 'http://' + location.hostname + ":" + location.port + '/api/';
        this.proxyService = new MarvelProxyService(baseURL);
        let boundRouter = this.router.bind(this);
        this.subscription = postal.subscribe({
            channel: "data.channel",
            topic: "#",
            callback: boundRouter


        });
        this.individualCharacterCache = {};
        this.comicCache = {};

    }

    router(data, envelope)
    {
        //characters.request
        // data: {requestType: 'initial-load'} 
        let me = this;
        switch (envelope.topic)
        {
            case  'characters.request':
            {
                if (data.requestType === 'initial-load')
                {


                    this.proxyService.findAllCharacters()
                            .then(function (data)
                            {
                                let items = JSON.parse(data);
                                postal.publish({
                                    channel: "data.channel",
                                    topic: "characters.inbound",
                                    data: {characters: items.data,
                                        count: items.count,
                                        offset: items.offset,
                                        total: items.total}
                                });

                            }).catch(function (err)
                    {

                        throw new Error(err.message);
                    });
                }
                if (data.requestType === 'navigation')
                {

                    this.proxyService.findAllCharacters(data.dir)
                            .then(function (data)
                            {
                                let items = JSON.parse(data);
                                postal.publish({
                                    channel: "data.channel",
                                    topic: "characters.inbound",
                                    data: {characters: items.data,
                                        count: items.count,
                                        total: items.total,
                                        offset: items.offset}
                                });

                            }).catch(function (err)
                    {

                        throw new Error(err.message);
                    });



                }
                break;
            }
            case  'comics.request':
            {
                
                if (me.comicCache[data.characterId])
                {
                     postal.publish({
                                    channel: "data.channel",
                                    topic: "comics.inbound",
                                    data: me.comicCache[data.characterId]
                                });
                    return;
                }
                
                
                
                  this.proxyService.findComicsForCharacter(data.characterId)
                            .then(function (comicData)
                            {
                                let items = JSON.parse(comicData);
                                let sentData = {comicData: items, count: items.count};
                                me.comicCache[data.characterId] = sentData;
                                postal.publish({
                                    channel: "data.channel",
                                    topic: "comics.inbound",
                                    data: sentData 
                                });

                            }).catch(function (err)
                    {

                        throw new Error(err.message);
                    });
                break;
            }

            default:
                break;
        }

    }
}

let _dataService = new DataFetchService();
export default _dataService;