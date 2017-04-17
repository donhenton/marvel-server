
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import dataFetchService from './services/dataFetchService'

//mainData is defined globally on the index.ejs page and is populated by Node/Express
//storageService.setUserId(mainData.userId);

ReactDOM.render(
        <Home /> 
    
   
  , document.querySelector('#reactContainer'));