import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import postal from 'postal';




export default class Main extends Component {

    constructor()
    {
        super();


    }

    componentWillMount()
    {
        this.state = {isProcessing: true};
        let me = this;



    }

    componentDidMount()
    {



    }

    componentWillUnmount() {



    }

    render() {


        return (
                <div>
                
                    <header>
                
                        
                
                        <nav className="topMenu grouping">
                
                
                            <ul>
                
                                <li><Link to="/main">Explore Folders</Link></li>
                                <li><Link to="/main/searchImages">Search For Images</Link></li>
                                 
                                <li><a href="/logout">Logout</a></li>
                
                            </ul>    
                
                
                        </nav>
                
                
                
                
                    </header>
                
                
                
                    <section id="main" className="grouping">
                
                        {this.props.children}
                    </section>
                
                
                </div>

                );








    } //end render
}