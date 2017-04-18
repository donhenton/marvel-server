import React from 'react';
import { Component } from 'react';
import DataFetchService from './../services/dataFetchService';


export default class CharacterDetail extends Component {

    constructor(props)
    {
        super(props);
        
        this.state = {};
        this.state['characterData'] = this.props.characterData;
        
       

    }
    componentDidMount()
    {
        
        
        
    }
    
    returnToList()
    {
        this.props.returnCallBack();
    }

    render()
    {

        return (
                <div className='character-detail'>
                     <div className='return-button' onClick={this.returnToList.bind(this)}>
                     <span className='fi-arrow-left'  />
                     </div>
                     <div className='title-area'>
                     <img src={this.state.characterData.imageUrl} />
                     <span className='character-name'>{this.state.characterData.name}</span>
                    </div>
                     
                </div>







                )

    }

}



