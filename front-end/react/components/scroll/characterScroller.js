import React from 'react';
import { Component } from 'react';
import SimpleInfiniteScroll from './simpleInfiniteScroll';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';


export default class CharacterScroller extends Component {

    constructor(props)
    {

        super(props);
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
                me.setState({characters: data.characters, count: data.count,
                    offset: data.offset, isLoading: false,
                    start: data.start, end: data.end, total: data.total})
            }
        });


        this.state = {characters: [], isLoading: true, hasMore: true,
            count: 0, offset: 0, total: 0, modalData: null};
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

    loadMore()
    {
        let me = this;
        postal.publish({
            channel: "data.channel",
            topic: "characters.request",
            data: {requestType: 'navigation', dir: 'next'}
        });
    }

    showLoader()
    {
        if (this.state.isLoading)
        {
            return <div className="scroll-loader"><img src='css/imgs/scroll-loader.gif' /></div>
        }
//        else
//        {
//            return <div>{JSON.stringify(this.state.characters)}</div>
//        }

    }

    renderCharacters()
    {
        let items = [];
        this.state.characters.forEach(i => {
            items.push(
                    <div key={i.id} className="scroll-item">
                        <span className="character-name">i.name</span>
                        <span className="character-img"><img src={i.imageUrl} /></span>
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
                
                    {this.showLoader()}
                
                
                    <SimpleInfiniteScroll hasMore={this.state.hasMore} 
                                          threshold={75}
                                          freezeWhileLoading={this.state.isLoading}  
                                          loadMoreCallback={this.loadMore.bind(this)} >
                
                        {this.renderCharacters()}  
                
                    </SimpleInfiniteScroll>
                </div>
                )


    }

}

/*
 
 <ReactCSSTransitionGroup  transitionName="modal-anim" transitionEnterTimeout={15} transitionLeaveTimeout={15}>
 
 
 </ReactCSSTransitionGroup>
 
 
 * 
 */