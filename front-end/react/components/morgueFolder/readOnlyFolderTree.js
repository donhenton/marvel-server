import React from 'react';
import { Component } from 'react';
import MorgueFolderTree from './morgueFolderTree' 
import postal from 'postal';
import storageService from './../../services/storageService'

/**
 * Read only folder tree component, this component provide the data
 * for the component
 * 
 * 
 */
export default class ReadOnlyFolderTree extends Component {

constructor()
{
        super();
        this.folderData = null;
        this.folderIdx = {};
        this.subscription = null;
}


 
componentWillMount()
{ 
      let me = this;
      this.folderData = storageService.getFolderData().children;
      this.state = { selectedKey: null,  folderData: this.folderData};
      let idxObj = storageService.getIndex(); 
      
      this.subscription = 
      postal.subscribe({
          
            channel: "deviant-system-folder-tree",
            topic: "select-folder" ,
            callback: function (data, envelope) {

               let folderName = idxObj[data.selectedKey].name 
               let folderData = {name: folderName , key: data.selectedKey }
              // console.log("sending on readonly tree "+JSON.stringify(folderData))
               me.setState({selectedKey: data.selectedKey});
               postal.publish({
               channel: "deviant-system",
               topic: "select-target-folder" ,
               data:  folderData
            });





            }
               });
      
}
 
componentWillUnmount () {
      
      this.subscription.unsubscribe();
  } 

render() {
     var me = this;
       
      
    return (
              <MorgueFolderTree selectedKey={this.state.selectedKey} folderData={this.state.folderData} />

                );  
      
      
      
      
}//end render 
 



}
  