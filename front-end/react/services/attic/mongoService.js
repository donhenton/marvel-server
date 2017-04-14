/**
 * 
 *  specific calls to the proxy on node for the mongo db persistence services.
 */

import rp from 'request-promise';

class MongoService
{

    constructor()
    {

        this.rootURL = 'http://' + location.hostname + ":" + location.port + '/storage';


    }

    getDataForUser(uId)
    {
        let userId = null;
        if (typeof uId === 'string')
        {
            userId = parseInt(uId);
        } else
        {
            userId = uId;
        }



        return rp(this.rootURL + "/getDataForUser/" + userId);
    }

    persistData(userId, data)
    {
        var options = {
            method: 'PUT',
            uri: this.rootURL + "/persistData/" + userId,
            body:  data,
            json: true // Automatically stringifies the body to JSON
        };
        
        return rp(options);
    }

}

let instance = new MongoService();
export default instance;

