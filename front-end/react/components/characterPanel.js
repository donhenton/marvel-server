import React from 'react';
import { Component } from 'react';
 
 
 


export default class CharacterIndicator extends Component {
            
            
            constructor(props)
            {
                super();
                this.state = {characterData: props.characterData};
                 
            }
            
           
            
           
            
            
            render()
            {
                
                return (
                      
                
                        
                 

                <div className='character-panel'>
                <img src={this.state.characterData.imageUrl} /> 
                {this.state.characterData.name}
                </div>
                 
                        
                        
                        
                        
                        
                        
                )
                
            }
            
            
    }

 