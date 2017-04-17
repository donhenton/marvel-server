import rp from 'request-promise' ;

export default class MarvelProxyService
    {

    constructor(baseURL)
    {
             // var baseURL = 'http://' + location.hostname + ":" + location.port + '/api/';
             this.rootURL = baseURL;
           
    }
    
    findAllCharacters(offset)
    {
        let offsetString = "";
        if (offset)
        {
            offsetString = '?offset='+offset;
        }
        let url = this.rootURL+"characters/findAll"+offsetString;
       // console.log("url is "+url)
        return rp(url);
        
    }
    
}
 