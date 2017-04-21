import React from 'react';
import { Component } from 'react';
import WaitIndicator from './../../components/waitIndicator';




export default class StoryDisplay extends Component {

    constructor()
    {
        super();
        this.subscriptions = [];

        let me = this;
        let sub1 = postal.subscribe({
            channel: "data.channel",
            topic: "stories.inbound",
            callback: function (data, envelope) {
               // console.log(JSON.stringify(data))
                me.setState({isProcessing: false,storiesData: data.storiesData})
            }
        });
        let sub2 = postal.subscribe({
            channel: "story.channel",
            topic: "stories.request",
            callback: function (data, envelope) {
                // console.log(JSON.stringify(data.characters))
                me.setState({isProcessing: true,characterId: data.characterId}, function ()
                {
                    //make a data request for story info
                    postal.publish({
                        channel: "data.channel",
                        topic: "stories.request",
                        data: {characterId: data.characterId}
                    });
                })
            }
        });
        this.subscriptions.push(sub1);
        this.subscriptions.push(sub2);
        this.state = {isProcessing: false,characterId: null,storiesData: null};
    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    render()
    {

        var me = this;
        if (this.state.isProcessing)
        {

            return  <div className='story-display'><WaitIndicator isProcessing={this.state.isProcessing} /></div>;
        }

        return (
                <div className='story-display'>
                    story-display
                </div>






                )

    }

}