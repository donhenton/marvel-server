import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import storageService from './../../services/storageService';


export default class FolderTarget extends Component  
{
    
   constructor()
  {
      super();
      this.subscription = null;
  }
         
  componentWillUnmount () {
      
      this.subscription.unsubscribe();
       
  } 
  
  getTargetFolder()
  {
      return this.state.targetFolder;
  }
  
  componentWillMount()
  {
      let me = this;
      let targetInfo = {name: "", key: "" }
      this.state = {targetFolder: targetInfo, receivingImage: false };
     this.subscription = postal.subscribe({
                channel: "deviant-system",
                topic: "select-target-folder" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        me.setState({'targetFolder': data});

                }
               });
  }
  
  getFolderText()
  {
      if (this.state.targetFolder.name.length > 0)
      {
          return this.state.targetFolder.name
      }
      else
      {
          return null;
      }
  }
  
  ///////////////////////// DND //////////////////////////////////////////
  
  targetDragEnter(e)
  {
      this.setState({receivingImage: true});
      console.log("target drag enter")
         
 }
 targetDragLeave(e)
  {
      this.setState({receivingImage: false});
       console.log("target drag leave")
      
      
 }
 targetDragEnd(e)
  {
      this.setState({receivingImage: false});
      console.log("target drag end")
      
      
 }
 targetDrop(e)
 {
      e.preventDefault();
      this.setState({receivingImage: false});
      let imageData = JSON.parse(e.dataTransfer.getData("application/json"));
      console.log("target drop "+ imageData.deviationid);
      storageService.insertIntoFolder(imageData,this.state.targetFolder) ;
       
       
       return false;
 }
 
 
 targetDragOver(e)
 {
      e.preventDefault();
       
 }
 
 getTargetCss()
 {
     let css = "targetFolder grouping ";
     if (this.state.receivingImage)
     {
         css = css + " incoming"
     }
     
     return css;
 }
  
 ///////////////////////// DND ////////////////////////////////////////// 
        
   render() {
      var me = this;
      if (!(me.state.targetFolder)  || me.state.targetFolder.name.length == 0)
      {
          return null;
      }
    return (
             <div id="targetFolderArea" 
                    
                className={me.getTargetCss()}>
              
                 
                 <div
         
                    onDragEnter={me.targetDragEnter.bind(me)}
                    onDragLeave={me.targetDragLeave.bind(me)}
                    onDragEnd={me.targetDragEnd.bind(me)}
                    onDragOver={me.targetDragOver.bind(me)}
                    onDrop={me.targetDrop.bind(me)}
                    id="targetFolderIcon" className="fi-folder" />
                    <div   
                    onDragEnter={me.targetDragEnter.bind(me)}
                    onDragLeave={me.targetDragLeave.bind(me)}
                    onDragEnd={me.targetDragEnd.bind(me)}
                    onDragOver={me.targetDragOver.bind(me)}
                    onDrop={me.targetDrop.bind(me)}
            
            
                    className="targetFolderTextContainer">   {me.getFolderText()}</div>  
             
             </div>
           )
   
        
        
        }
        
}