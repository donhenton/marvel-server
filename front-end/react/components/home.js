import React from 'react';
import { Component } from 'react';
//import postal from 'postal'; postal is public via CDN
//import { BrowserRouter as Router, Link} from 'react-router-dom';
import Characters from './../pages/charactersPage';
import Stories from './../pages/storiesPage';
import ImageModal from './modal/imageModal';

export default class Main extends Component {

    constructor()
    {
        super();
        this.subscriptions = [];

    }

    componentWillMount()
    {
        let me = this;
        let sub1 = postal.subscribe({
            channel: "menu.channel",
            topic: "select-page",
            callback: function (data, envelope) {

                me.setState({page: data.page})
            }
        });

        let showBind = me.showModal.bind(this)
        let sub2 = postal.subscribe({
            channel: "image.request",
            topic: "display.#",
            callback: function (data, envelope) {
                let modalClass = "detail-image-modal";
                let displaceAmt = 0;
                if (envelope.topic === 'display.character')
                {
                    modalClass = 'character-image-modal';
                    displaceAmt = 10;
                }
                me.setState({modalClass: modalClass, imageUrl: data.imageUrl,displaceAmt:displaceAmt}, function () {
                    showBind()
                })
            }
        });
        let sub3 = postal.subscribe({
            channel: "responsive",
            topic: "orientation.change",
            callback: function (data, envelope) {

                me.setState({orientData: data.type});
            }
        });
         
        
        
        this.state = {page: 'main', imageUrl: null, orientData: null,
            modalClass: null,displaceAmt: -15};
        this.subscriptions.push(sub1);
        this.subscriptions.push(sub2);
        this.subscriptions.push(sub3);

    }

    showModal()
    {
        let failImageUrl = 'css/imgs/big_na.png';
        let img = new Image();
        let me = this;
        img.onload = function ()
        {
            postal.publish({
            channel: "modal",
            topic: "open",
            data: {}
        });
            me.refs.imageModal.open(me.state.imageUrl);
        }
        img.onerror = function ()
        {
            me.refs.imageModal.open(failImageUrl);
        }


        img.src = this.state.imageUrl;



    }

    componentDidMount()
    {



    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    render() {


        switch (this.state.page)
        {

            case 'Stories':
            {

                return <Stories />
            }

            case 'Characters':
            {

                return (
                        <div>
                            <Characters />
                            <ImageModal ref='imageModal' displaceAmt={this.state.displaceAmt} 
                            modalClassName={this.state.modalClass} 
                            imageUrl={this.state.imageUrl} 
                            modalLabel={this.state.imageUrl} />
                                    
                        </div>)
            }

            default:
            {
                return (
                        <div>
                        
                        
                            <h1>Marvel API Explorer</h1>
                        
                            <div className="lead-block">
                                Click on a menu option to explore the Marvel Universe!
                        
                            </div>
                        
                        
                        <div>{this.state.orientData}</div>
                        
                        
                        </div>
                        )
            }






        }





    } //end render
}