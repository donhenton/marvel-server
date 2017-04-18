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
                
                  this.proxyService.findComicsForCharacter(data.characterId)
                            .then(function (data)
                            {
                                let items = JSON.parse(data);
                                postal.publish({
                                    channel: "data.channel",
                                    topic: "comics.inbound",
                                    data: items
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