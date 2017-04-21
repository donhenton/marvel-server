import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import WaitIndicator from './../components/waitIndicator';
import CharacterScroller from './../components/scroll/characterScroller';
import StoryDisplay from './../components/stories/storyDisplay';


export default class StoriesPage extends Component {

    constructor()
    {
        super();
        
    }

    componentWillMount()
    {
      



    }

    

    render() {
        var me = this;

        return (<div className='stories-page'>
                <CharacterScroller />
                <StoryDisplay />
                </div>
              );
    }
}