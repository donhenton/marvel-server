import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import WaitIndicator from './../components/waitIndicator';
import CharacterPanel from './../components/character/characterPanel';
import CharacterDetail from './../components/character/characterDetail';


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
                me.setState({characterData: data.characters, count: data.count,
                    offset: data.offset, isProcessing: false,
                    start: data.start, end: data.end, total: data.total})
            }
        });
        let sub2 = postal.subscribe({
            channel: "character.page",
            topic: "characters.modal",
            callback: function (data, envelope) {
                me.setState({modalData: data.characterData, showDetail: true})
            }
        });
        let sub3 = postal.subscribe({
            channel: "responsive",
            topic: "orientation.change",
            callback: function (data, envelope) {

                  me.setState({orientType: data.type});
            }
        });



        this.state = {characterData: [], isProcessing: true, 
            showDetail: false, orientType: null,
            count: 0, offset: 0, total: 0, modalData: null};
        this.subscriptions.push(sub1);
        this.subscriptions.push(sub2);
        this.subscriptions.push(sub3);

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
       // console.log("navigate " + dir)
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
        this.state.characterData.forEach(d => {
            images.push(<CharacterPanel characterData={d} key={d.id} />);
        })


        return images;


    }

    getDisplayString()
    {
        let breakItem = <br/>
        if (window.innerWidth > 600)
        {
            breakItem = null;
        }
        let str = (this.state.offset + 1) + " To "
                + (this.state.offset + this.state.count)
                + " Of " + (this.state.total);
        
        return (<div   className='control-text'>
                    <div className='control-text-line'>Character</div> {breakItem}
        
            <div className='control-text-line'>{str}</div>
        
        </div>)
 


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

    returnCallBack()
    {
        this.setState({modalData: null, showDetail: false})
    }

    render() {
        var me = this;
        if (this.state.isProcessing)
        {

            return <WaitIndicator isProcessing={this.state.isProcessing} />;
        }
        if (this.state.showDetail)
        {
            return <CharacterDetail characterData={this.state.modalData} returnCallBack={this.returnCallBack.bind(me)} />
        }

        return (
                <div className='characters-page'>
                    <div className='character-controls grouping'>
                        {me.getDisplayString()} 
                        <div>
                            {me.renderPrevBtn()}
                            <span onClick={me.navigate.bind(this, 'next')} 
                                  className='control-box  control-right'><span className='  fi-arrow-right'></span></span>
                        </div>
                    </div>
                    <div className='flex-container'>{me.displayImages()}</div>
                
                </div>
                );
    }
}

