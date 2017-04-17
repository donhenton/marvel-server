import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import WaitIndicator from './../components/waitIndicator';

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

                me.setState({characterData: data.characters,isProcessing:false})
            }
        });


        this.state = {characterData: [],isProcessing:true};
        this.subscriptions.push(sub1);



    }

    componentDidMount()
    {
        postal.publish({
            channel: "data.channel",
            topic: "characters.outbound",
            data: {requestType: 'initial-load'} 
        });
    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    render() {
        var me = this;
        if (this.state.isProcessing)
        {
            
            return <WaitIndicator isProcessing={this.state.isProcessing} />;
        }

        return (<div>Characters</div>);
    }
}