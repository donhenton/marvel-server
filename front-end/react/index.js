
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

//import storageService from './services/storageService'

//mainData is defined globally on the index.ejs page and is populated by Node/Express
//storageService.setUserId(mainData.userId);

ReactDOM.render(
        <Main /> 
    
   
  , document.querySelector('#reactContainer'));