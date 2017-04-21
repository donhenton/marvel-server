import React from 'react';
import { Component } from 'react';
import SimpleInfiniteScroll from './simpleInfiniteScroll';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import WaitIndicator from './../waitIndicator';

export default class CharacterScroller extends Component {

    constructor(props)
    {

        super(props);
        this.subscriptions = [];
        let me = this;
        this.loaderImage = new Image();

        let sub1 = postal.subscribe({
            channel: "data.channel",
            topic: "characters.inbound",
            callback: function (data, envelope) {
                // console.log(JSON.stringify(data.characters))
                let tCharacters = [].concat(me.state.characters);
                tCharacters = tCharacters.concat(data.characters)

                me.setState({characters: tCharacters, count: data.count,
                    offset: data.offset, isLoading: false,
                    start: data.start, end: data.end, total: data.total})
            }
        });


        this.state = {characters: [], isLoading: true, hasMore: false,
            count: 0, offset: 0, total: 0, modalData: null};
        this.subscriptions.push(sub1);


    }

    componentWillMount()
    {

    }
    componentDidMount()
    {
        this.loaderImage.onload =
                function ()
                {
                    postal.publish({
                        channel: "data.channel",
                        topic: "characters.request",
                        data: {requestType: 'initial-load'}
                    });
                };
        this.loaderImage.src = 'css/imgs/scroll-loader.gif';


    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    loadMore()
    {
        let me = this;
        postal.publish({
            channel: "data.channel",
            topic: "characters.request",
            data: {requestType: 'navigation', dir: 'next'}
        });
    }

    showLoader(type)
    {
        let showBlock = {dipslay: 'inline'};
        let hideBlock = {display: 'none'}
        if (this.state.isLoading)
        {
            if (type === 'img')
            {
                return showBlock;
            }
            if (type === 'text')
            {
                return hideBlock;
            }
        }
        if (!this.state.isLoading)
        {
            if (type === 'img')
            {
                return hideBlock;
            }
            if (type === 'text')
            {
                return showBlock;
            }
        }

    }

    renderCharacters()
    {
        let items = [];
        this.state.characters.forEach(i => {
            items.push(
                    <div key={i.id} className="scroll-item">
                    
                        <span className="flex-item character-img">
                        <img src={i.imageUrl} />
                        </span>
                        <span className="flex-item character-name">{i.name}</span>
                    </div>


                    )

        })

        return items;
    }

    render()
    {

        var me = this;


        return (
                <div className="character-scroller">
                    <div className="loader-area">
                        <img style={this.showLoader('img')} src='css/imgs/scroll-loader.gif' />  
                        <span style={this.showLoader('text')}>Complete  </span>
                    </div>
                    <div className='scroller-container'>  
                        <WaitIndicator isProcessing={this.state.isLoading} />
                          <SimpleInfiniteScroll hasMore={this.state.hasMore} 
                                              threshold={75}
                                              freezeWhileLoading={this.state.isLoading}  
                                              loadMoreCallback={this.loadMore.bind(this)} >
                                              
                            {this.renderCharacters()}  
                
                        </SimpleInfiniteScroll>        
                
                    </div>
                </div>
                )


    }

}

/*
 
 
 
 
 
 */