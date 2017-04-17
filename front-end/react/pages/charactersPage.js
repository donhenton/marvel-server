import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import WaitIndicator from './../components/waitIndicator';
import CharacterPanel from './../components/characterPanel';





export default class CharactersPage extends Component {

    constructor()
    {
        super();
        this.subscriptions = [];
    }

    componentWillMount()
    {
        let me = this;
        let sub1 = postal.subscribe({
            channel: "data.channel",
            topic: "characters.inbound",
            callback: function (data, envelope) {
                // console.log(JSON.stringify(data.characters))
                me.setState({characterData: data.characters, isProcessing: false, start: data.start, end: data.end})
            }
        });


        this.state = {characterData: [], isProcessing: true, start: 0, end: 0};
        this.subscriptions.push(sub1);



    }

    componentDidMount()
    {
        postal.publish({
            channel: "data.channel",
            topic: "characters.request",
            data: {requestType: 'initial-load'}
        });
    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    navigate(dir)
    {
        console.log("navigate " + dir)
        this.setState({isProcessing: true}, function ()
        {
            postal.publish({
                channel: "data.channel",
                topic: "characters.request",
                data: {requestType: 'navigation', dir: dir}
            });
        });
    }

    displayImages()
    {
        let images = [];
        // console.log(JSON.stringify(this.state.characterData))
        this.state.characterData.forEach(d => {
            images.push(<CharacterPanel characterData={d} key={d.id} />);
        })


        return images;


    }

    render() {
        var me = this;
        if (this.state.isProcessing)
        {

            return <WaitIndicator isProcessing={this.state.isProcessing} />;
        }

        return (<div className='characters-page'>
            <div className='character-controls grouping'>
        
                <span onClick={me.navigate.bind(this, 'prev')} className='control-box control-left'><span className=' fi-arrow-left'></span></span>
                <div   className='control-text'>Displaying 1200 - 1120</div>
                <span onClick={me.navigate.bind(this, 'next')} className='control-box  control-right'><span className='  fi-arrow-right'></span></span>
            </div>
            <div className='flex-container'>{me.displayImages()}</div>
        </div>
                );
    }
}