import React from 'react';
import { Component } from 'react';
 
 
 


export default class WaitIndicator extends Component {
            
            
            constructor()
            {
                super();
                
                 
            }
            
           
            
            hideWaitIndicator()
            {
                //console.log("wait indicator "+this.props.isProcessing)
                if (this.props.isProcessing)
                {
                    return "waitIndicator";
                }
                return "hidden";
            }
            
            
            render()
            {
                
                return (
                      
                
                        
                 

                <div className={this.hideWaitIndicator()}  />
                 
                        
                        
                        
                        
                        
                        
                )
                
            }
            
            
    }

 