// Invoke 'strict' JavaScript mode
'use strict';

// this is the deviant art client id and secret 
// the dev copy is not saved in git and must be recreated 

/*
module.exports = {
	 client_id: deviant id,
         client_secret: deviant secret,
         deviantStorageDB:  'mongodb://localhost/deviantart',
         sessionSecret: "somesession secret"
};
*/


module.exports =  {
     client_id: process.env.client_id,
     client_secret: process.env.client_secret,
     deviantStorageDB: process.env.deviantStorageDB,
     sessionSecret: process.env.sessionSecret
}
