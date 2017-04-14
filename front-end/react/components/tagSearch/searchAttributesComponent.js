
import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';
import ReactDOM from 'react-dom';
import postal from 'postal';



export default class SearchAttributesComponent extends Component  
{
    
   constructor()
  {
      super();
      this.subscription = null;
       
  }
  
  
  
  componentWillUnmount () {
      
      this.subscription.unsubscribe();
       
  } 
               
  
  
  componentWillMount()
  {
      this.state = {'tag': null};
      var me = this;
      
      
      
      //data:  {tag: tagName}
       this.subscription = postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.setState({'tag': data.tag});
                             
                        }
               });
 
  }
  
  componentWillUnmount () {
     
  }
  
   
  
 
        
  render() {
      var me = this;
    return (
       
        <span className="searchAttributes">
             Selected Tag: {me.state.tag}
            
       </span>
       
       
    );
  } 
    
 
}