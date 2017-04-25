import React from 'react';
import { Component } from 'react';
import WaitIndicator from './../../components/waitIndicator';
import StoryItem from './storyItem';



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
                me.setState({isProcessing: false, storiesData: data.storiesData})
            }
        });
        let sub2 = postal.subscribe({
            channel: "story.channel",
            topic: "stories.request",
            callback: function (data, envelope) {
                // console.log(JSON.stringify(data.characters))
                me.setState({isProcessing: true, characterId: data.characterId, characterName: data.characterName}, function ()
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
        this.state = {isProcessing: false, characterId: null, storiesData: null, characterName: null};
    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    renderStoryItems()
    {
        let titles = [];
        if (this.state.storiesData && this.state.storiesData.data)
        {
            this.state.storiesData.data.forEach(s => {
                titles.push(<StoryItem storyItem={s} key={s.id} />)

            })
        }

        return titles;
    }
    
    getStoryLabel()
    {
        return this.state.characterName;
    }

    render()
    {

        var me = this;
        if (this.state.isProcessing)
        {

            return  (
                    <div  className='story-display'>
                        <div className="story-label">
                            Processing ...
                        </div>
                        <div className='story-display-container'>
                            <WaitIndicator isProcessing={this.state.isProcessing} />
                        </div>
                    </div>
                    );
        }
        if (this.state.storiesData && this.state.storiesData.data
                && this.state.storiesData.data.length == 0)
        {
            return (
                     <div  className='story-display'>
                        <div className="story-label">
                             {me.getStoryLabel()}
                        </div>
                        <div className='story-display-container'>
                            <div className="no-data">No Data Found</div> 
                    
                        </div>
                    </div>
                    )
        }

        return (
                 <div  className='story-display'>
                    <div className="story-label">
                        {me.getStoryLabel()}
                    </div>
                    <div className='story-display-container'>
                        {me.renderStoryItems()}
                    </div>
                
                </div>




                )

    }

}