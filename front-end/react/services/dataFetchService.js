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
                                    data: {characters: items}
                                });

                            }).catch(function (err)
                    {

                        throw new Error(err.message);
                    });
                }
                if (data.requestType === 'navigation')
                {
                    console.log("hit 1 "+data.dir)
                    this.proxyService.findAllCharacters(data.dir)
                            .then(function (data)
                            {
                                let items = JSON.parse(data);
                                 console.log("hit 2\n\n"+items)
                                postal.publish({
                                    channel: "data.channel",
                                    topic: "characters.inbound",
                                    data: {characters: items}
                                });

                            }).catch(function (err)
                    {

                        throw new Error(err.message);
                    });



                }

            }

            default:
                break;
        }

    }
}

let _dataService = new DataFetchService();
export default _dataService;