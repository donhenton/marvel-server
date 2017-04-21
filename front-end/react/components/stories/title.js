import React from 'react';
import { Component } from 'react';




export default class Title extends Component {

    constructor(props)
    {
        super(props);

    }

    render()
    {
       return <div className='story-item'>
            {this.props.storyItem.title}
        </div>
    }

}