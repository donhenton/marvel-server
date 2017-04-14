# Deviant Art Morgue Application

This application uses the DeviantArt API to explore images by tags, create folders
to save those images, and explore the 'More Like This Functionality' available in the API. It is deployed at
http://donhenton-deviant-server.herokuapp.com/.


### Running Locally

DeviantArt API credentials are required and can be obtained at https://www.deviantart.com/developers/
This key is then placed in the config/env/development.js file which IS NOT in the source tree.
See config/env/production.js for how to create the development.js file with your api key.

You will also need to set up a local mongodb instance, and configure the connection url in the
development.js file

### Users and Mongo data
* models/code/run.js is a utility for creating users 
* for right now entries into the morgueFiles collection
must be manually entered
* collections are users and morgueFiles
* see models/mongo_data.zip for examples


### Starting the Server

* start gulp default

### Preparing For Heroku release

* run gulp release
* the bundle.js under public_html/js/bundle.js will be compressed and will be expanded when development starts again
* node server.js to see it running outside of dev mode


