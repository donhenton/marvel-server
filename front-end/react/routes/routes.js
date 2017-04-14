import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './../components/main';
 
import SearchImagesPage from './../pages/searchImagesPage'; 
import MaintainFoldersPage from './../pages/maintainFoldersPage';
import ExploreFoldersPage from './../pages/exploreFoldersPage';
import CategoryDemoPage from './../pages/categoryDemoPage';
import HelpPage from './../pages/helpPage';

export const createRoutes = () => (
  <Route path="/main" component={Main} >
    <IndexRoute component={ExploreFoldersPage} />
    <Route path="/main/maintainFolders" component={MaintainFoldersPage} />  
    <Route path="/main/searchImages" component={ SearchImagesPage} /> 
    <Route path="/main/categoryDemo" component={ CategoryDemoPage} /> 
    <Route path="/main/help" component={HelpPage} /> 
  </Route>
);


 