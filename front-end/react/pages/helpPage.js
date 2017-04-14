import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';


export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
      
  }
  
 
        
  render() {
      var me = this;
           
      
    return (
       
         <div className="row">
         <h2>Help</h2>
         
         
         
                    <p className="row">This application stores references to images on deviantart.com, using mongodb for persistence.
                    You can create, and edit folders to store images in. You can also explore deviant art images by keyword, 
                    placing images into the folders that you created. Once you have images in folders, you can use the deviant art
                    'More Like This' feature to find similar images.
                    </p>
                   
 <div className="column50Left">
 <h3>Explore Folders:</h3>
 <blockquote className="list">
<ul className="basic-list">
<li>Click on a folder</li>
<li>Click on a displayed image</li>
<li>Click on 'More Like This'</li>
</ul>
</blockquote>

 
<h3>Search For Images:</h3>
<blockquote className="list">
<ul className="basic-list">
<li>Select a MorgeFolder to store images into</li>
<li>Enter search term in 'Search For'</li>
<li>Click on an image</li>
<li>Drag the larger image to the large folder icon</li>
</ul>
</blockquote>
</div>
 <div className="column50Right">
<h3>Maintain Folders:</h3>
<blockquote className="list">
<ul className="basic-list">
<li>Select a MorgeFolder change/add subfolder</li>
<li>Select root folder to add a new folder</li>
<li>Select an action (add, edit or delete)</li>
 
</ul>
</blockquote>
 
 
<h3>Category Demo:</h3>
<blockquote className="list">
<p>Demonstration of on demand tree display of deviant art image categories</p>
</blockquote>
</div>




<p className="row"><a target="_new" href="https://github.com/donhenton/deviantart-server">Source Code for this project</a></p>


         
         
         
         
             
        </div>
    );
  }
}