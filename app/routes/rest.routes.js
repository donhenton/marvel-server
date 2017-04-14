// Invoke 'strict' JavaScript mode
'use strict';
var url = require("url");
// Define the routes module' method
module.exports = function (app, daService) {

    //dummyService is passed in express.js

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(daService.createError(errorString, "ErrorClass"));
    }
    
    
    var processGetCategories = function (req, res) {
        var url_parts = url.parse(req.url);
        var path = url_parts.pathname.replace('/deviant/getCategories','');
         console.log('replaced '+path);
         
        if (path === '' || !path)
        {
            path = "/";
        }
         
        daService.getCategories(path).then(function (data)
            {
                res.json(data);
            },

            function (err)
            {
                reportError(res, err.toString());
            }


        );


    }
    
    var processTagSearch = function(req,res)
    {
        
        var tagName = req.query.tag_name;
 
         
        daService.searchTags(tagName).then(function (data)
            {
                res.json(data);
            },

            function (err)
            {
                reportError(res, err.toString());
            }


        ); 
         
         
    }
    
    var processTagImages = function(req,res)
    {
        
      //  https://www.deviantart.com/api/v1/oauth2/browse/tags
       var tag  = req.query.tag ;
       var limit = req.query.limit;
       var offset = req.query.offset;
       
     
         
        daService.getTagImages(tag,offset,limit).then(function (data)
            {
                res.json(data);
            },

            function (err)
            {
                reportError(res, err.toString());
            }


        ); 
        
    }
    var processMoreLikeThis = function(req,res)
    {
        
      //  https://www.deviantart.com/api/v1/oauth2/browse/tags
       var seed  = req.query.seed ;
       var limit = req.query.limit;
       var offset = req.query.offset;
       
     
         
        daService.getMoreLikeThis(seed,offset,limit).then(function (data)
            {
                res.json(data);
            },

            function (err)
            {
                reportError(res, err.toString());
            }


        ); 
        
    } 
    
    app.get(['/deviant/getCategories','/deviant/getCategories*'], processGetCategories);
    app.get(['/deviant/tagSearch' ], processTagSearch); 
    app.get(['/deviant/tagImages' ], processTagImages); 
    app.get(['/deviant/morelikethis' ], processMoreLikeThis); 

};



 