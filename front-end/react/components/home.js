import React from 'react';
import { Component } from 'react';
//import postal from 'postal'; postal is public via CDN
//import { BrowserRouter as Router, Link} from 'react-router-dom';
import Characters from './../pages/charactersPage';
import Writers from './../pages/writersPage';

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


        this.state = {page: 'main'};
        this.subscriptions.push(sub1);



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
                    
                    return <Characters />
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