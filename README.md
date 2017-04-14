# Marvel API Application

This application uses the Marvel API. It is intended to be a demonstration
of a mobile first Responsive Web Application.


### Running Locally


Place your Marvel API key  in the config/env/development.js file which IS NOT in the source tree.
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

* start gulp default will run in front end mode

### Preparing For Heroku release

* run gulp release
* the bundle.js under public_html/js/bundle.js will be compressed and will be expanded when development starts again
* node server.js to see it running outside of dev mode


