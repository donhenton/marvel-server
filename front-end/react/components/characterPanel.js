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
                <div className='character-panel box-item'>
                    
                    <div className='image-item'><img src={this.state.characterData.imageUrl} /> </div>
                    <div className='character-name'>{this.state.characterData.name}</div>
                </div>

                )

    }

}

