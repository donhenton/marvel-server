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
     publicKey: process.env.publicKey,
     privateKey: process.env.privateKey,
     deviantStorageDB: process.env.deviantStorageDB,
     sessionSecret: process.env.sessionSecret
}
