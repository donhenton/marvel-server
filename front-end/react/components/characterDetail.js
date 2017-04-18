import React from 'react';
import { Component } from 'react';
import DataFetchService from './../services/dataFetchService';
import WaitIndicator from './../components/waitIndicator';
import ComicPanel from './comicPanel';

export default class CharacterDetail extends Component {

    constructor(props)
    {
        super(props);

        this.state = {isProcessing: true,comicData:[],characterData: this.props.characterData};    
        this.subscriptions = [];

    }
    
    componentWillMount()
    {
        let me = this;
        let sub1 = postal.subscribe({
            channel: "data.channel",
            topic: "comics.inbound",
            callback: function (data, envelope) {
                console.log("hit me\n"+JSON.stringify(data))
                me.setState({comicData:  data.comicData,isProcessing: false})
            }
        });
  
        this.subscriptions.push(sub1);
 
    }
    
    
    
    
    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    componentDidMount()
    {

        postal.publish({
            channel: "data.channel",
            topic: "comics.request",
            data: {requestType: 'load',characterId: this.state.characterData.id}
        });

    }

    returnToList()
    {
        this.props.returnCallBack();
    }
    
    getComicItems()
    {
     
        let items = [];
        this.state.comicData.data.forEach(d => {
            items.push(<ComicPanel comicData={d} key={d.id} />);
        })


        return items;


    
    }

    render()
    {

        if (this.state.isProcessing)
        {

            return <WaitIndicator isProcessing={this.state.isProcessing} />;
        }

        return (
                <div className='character-detail'>
                    <div className='title-area' onClick={this.returnToList.bind(this)}>
                    <span className='return-button' onClick={this.returnToList.bind(this)}>
                        <span className='fi-arrow-left'  />
                    </span>
                        <img src={this.state.characterData.imageUrl} />
                        <span className='character-name'>{this.state.characterData.name}</span>
                    </div>
                     <div className='comic-display grouping'>
                        {this.getComicItems()}
                    </div>
                
                
                </div>







                )

    }

}



