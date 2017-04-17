import rp from 'request-promise' ;

export default class MarvelProxyService
    {

    constructor(baseURL)
    {
             // var baseURL = 'http://' + location.hostname + ":" + location.port + '/api/';
             this.rootURL = baseURL;
           
    }
    
    findAllCharacters(dir)
    {
        let offsetString = "";
        if (dir)
        {
            offsetString = '?dir='+dir;
        }
        let url = this.rootURL+"characters/findAll"+offsetString;
       // console.log("url is "+url)
        return rp(url);
        
    }
    
}
 