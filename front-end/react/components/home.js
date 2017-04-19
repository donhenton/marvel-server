import React from 'react';
import { Component } from 'react';
//import postal from 'postal'; postal is public via CDN
//import { BrowserRouter as Router, Link} from 'react-router-dom';
import Characters from './../pages/charactersPage';
import Writers from './../pages/writersPage';
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
            topic: "display.comic",
            callback: function (data, envelope) {
                me.setState({imageUrl: data.imageUrl}, showBind)
            }
        });
        this.state = {page: 'main', imageUrl: null};
        this.subscriptions.push(sub1);
        this.subscriptions.push(sub2);


    }
    
  showModal()
  {
      
       postal.publish({
            channel: "modal",
            topic: "open",
            data: {}
        });
        this.refs.imageModal.open();
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

            case 'Writers':
            {

                return <Writers />
            }

            case 'Characters':
            {

                return (
                        <div>
                            <Characters />
                            <ImageModal ref='imageModal' modalClassName="image-modal" imageUrl={this.state.imageUrl} modalLabel={this.state.imageUrl} />
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
                        
                        
                        
                        
                        
                        </div>
                        )
            }






        }





    } //end render
}