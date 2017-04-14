
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createRoutes } from './routes/routes';
import storageService from './services/storageService'

//mainData is defined globally on the index.ejs page and is populated by Node/Express
storageService.setUserId(mainData.userId);

ReactDOM.render(
 
    <Router routes={createRoutes()} history={browserHistory} />
   
  , document.querySelector('#pageContainer'));