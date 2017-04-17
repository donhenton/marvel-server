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
                me.setState({characterData: data.characters, count: data.count, offset: data.offset, isProcessing: false, start: data.start, end: data.end})
            }
        });


        this.state = {characterData: [], isProcessing: true, count: 0, offset: 0};
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
    
    getDisplayString()
    {
        let str = "Displaying "
        str = str + (this.state.offset+1)+ " To "+ (this.state.offset+this.state.count);
        
        return str;
    }
    
    
    renderPrevBtn()
    {
        let me = this;
        if (this.state.offset === 0)
        {
            return null;
        }
        return <span onClick={me.navigate.bind(this, 'prev')} className='control-box control-left'><span className=' fi-arrow-left'></span></span>;
    }

    render() {
        var me = this;
        if (this.state.isProcessing)
        {

            return <WaitIndicator isProcessing={this.state.isProcessing} />;
        }

        return (<div className='characters-page'>
            <div className='character-controls grouping'>
        
                {me.renderPrevBtn()}
                <div   className='control-text'>{me.getDisplayString()}</div>
                <span onClick={me.navigate.bind(this, 'next')} className='control-box  control-right'><span className='  fi-arrow-right'></span></span>
            </div>
            <div className='flex-container'>{me.displayImages()}</div>
        </div>
                );
    }
}