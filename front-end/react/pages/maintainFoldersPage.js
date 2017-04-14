import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import storageService from './../services/storageService'
import MorgueFolderTree from './../components/morgueFolder/morgueFolderTree'
import postal from 'postal'

export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
      this.treeRef = null;
      this.folderData = null;
      this.folderIdx = {};
      this.subscription = null;
  }
  
 
    componentWillMount()
  {
      let me = this;
      this.folderData = storageService.getFolderData();
      this.state = { selectedKey: "", selectedFolderName: "", folderData: this.folderData, actionMode: "INIT"};
      this.subscription = postal.subscribe({
          
                        channel: "deviant-system-folder-tree",
                        topic: "select-folder" ,
                        callback: function (data, envelope) {
                              
                          // console.log("receiving "+data.selectedKey)   
                           me.setState({selectedKey:data.selectedKey, selectedFolderName: "",actionMode: "CHOOSE"})    
                             
                        }
               });
      
  }
  
  componentWillUnmount () {
     // console.log("performing unsub folder page")
      this.subscription.unsubscribe();
      postal.unsubscribe(this.subscription)
  } 
  
  mapFolderNameChange(ev)
  {
      this.setState({selectedFolderName: ev.target.value})
  }
   
  editFolder(e)
  {
      e.preventDefault();
      if (this.state.actionMode === 'CHOOSE')
     {
         //you are requesting an edit
         let idxObj = storageService.getIndex(); 
         let folderName = idxObj[this.state.selectedKey].name   
         this.setState({actionMode: "EDIT", selectedFolderName: folderName})
         
     }
     if (this.state.actionMode === 'EDIT')
     {
        //you are saving an edit, the button says save
        let newFolderData = storageService.saveEdit(this.state.selectedKey, this.state.selectedFolderName)
        this.setState({folderData: newFolderData,selectedFolderName: "", actionMode:"CHOOSE"})
      //console.log('hit form '+this.state.selectedFolderName)
     }
     if (this.state.actionMode === 'ADD')
     {
        //you are saving an add, the button says save
        let newFolderData = storageService.addFolder(this.state.selectedKey, this.state.selectedFolderName)
        this.setState({folderData: newFolderData,selectedFolderName: "", actionMode:"CHOOSE"})
      //console.log('hit form '+this.state.selectedFolderName)
     }
      
  }
  
  addFolder(e)
  {
      e.preventDefault();
       
     if (this.state.actionMode === 'CHOOSE')
     {
         //requesting an add 
         this.setState({actionMode: "ADD", selectedFolderName: ""})
     }
     if (this.state.actionMode === 'EDIT' || this.state.actionMode === 'ADD')
     {
         // this is a cancel request
         this.setState({actionMode: "CHOOSE",  selectedFolderName: ""})
     } 
      
  }
  
  deleteFolder(e)
  {
        e.preventDefault();
        let idxObj = storageService.getIndex(); 
        let folderData = idxObj[this.state.selectedKey]
       
        var retVal = confirm("WARNING: Deleting will remove all children and contents!\n Do you want to continue?");
        if (retVal === true)
        {
             let newFolderData = storageService.deleteFolder(this.state.selectedKey)
             this.setState({ selectedKey: "",folderData: newFolderData,selectedFolderName: "", actionMode:"INIT"})
        }
       
      
      
  }
 
  
  getButtonText(type)
  {
     let t = "Add";
     if (this.state.actionMode === 'CHOOSE')
     {
         if (type ==="EDIT")
         {
             t = "Edit"
         }
         
     }
     if (this.state.actionMode === 'ADD' || this.state.actionMode === 'EDIT')
     {
         if (type === "EDIT")
         {
             t = 'Save'
             
         }
         else
         {
             t = 'Cancel'
         }
         
     }    
      
     return t;
      
  }    
  
  
  disableItem(type)
  {
      var disable = false;
      if (this.state.actionMode === "INIT")
      {
           return true;
      }
      
      if (type==="EDIT")
      {
           
          
      }
      if (type==="ADD")
      {
          
          
      }
      if(type==="INPUT")
      {
          if (this.state.actionMode === "CHOOSE")
          {
              disable = true;
          }
          
      }   
      
      return disable;
          
  }
  
  getCSSForButton(type)
  {
      let css = "";
      if (type === 'DELETE')
      {
          css = "btn btn-red space-left"
          if (this.state.selectedKey === "/0" || this.state.actionMode != 'CHOOSE')
          {
             css = css + " hidden"
          }
      }
      else
      {
          css  = "btn btn-primary space-right"
          if (this.state.selectedKey === "/0" && this.state.actionMode === 'CHOOSE')
          {
             css = css + " hidden"
          }
      }
     
      return css;
  }
        
        
  render() {
      var me = this;
           
      
    return (
       
         <div>
         <h2>Maintain Folders</h2>
            <div className="column50Left">
            <h2>Morgue Folders</h2>
                
       
               <MorgueFolderTree selectedKey={this.state.selectedKey} folderData={[this.state.folderData]} />
       
       
       
           </div>
            <div className="column50Right">
                
                <form className={this.state.actionMode==='INIT'? 'form well folderForm hidden' : "form well folderForm" }  >
                  <table  className='table table-striped'>
                    <tbody>
                      <tr>
                      <th><label>Key:</label></th><td>{this.state.selectedKey +" ("+this.state.actionMode+")"}</td> 
                      
                      </tr>
                      <tr>
                        <th>
                        <label for="folderName">Folder Name:</label>
                        </th>
                        <td>
                        <input id="folderInput"   type="text" disabled={me.disableItem('INPUT')} onChange={me.mapFolderNameChange.bind(me)} value={this.state.selectedFolderName} size="35" id="folderName" />
                        </td>
                           </tr>
                   </tbody>
               </table>
                       <div className="row">
                        <button id="saveFolder" disabled={me.disableItem('EDIT')}   type="button" onClick={this.editFolder.bind(me)} className={me.getCSSForButton('EDIT')}>
                        {me.getButtonText('EDIT')}</button>
                         
                        <button id="addFolder" disabled={me.disableItem('ADD')} type="button" onClick={this.addFolder.bind(me)}  className="btn btn-primary space-right">
                        {me.getButtonText('ADD')}</button>
                         
                        <button id="deleteFolder"   type="button" onClick={this.deleteFolder.bind(me)}  className={me.getCSSForButton('DELETE')}>
                        Delete</button>
                         </div>
                
               
                </form>

            </div>
        </div>
    );
  }
}