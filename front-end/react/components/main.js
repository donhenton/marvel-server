import React from 'react';
import { Component } from 'react';
import postal from 'postal';
//import { BrowserRouter as Router, Link} from 'react-router-dom';



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
                <Router>
                    <div>
                
                        This is from component main
                
                    </div>
                </Router>
                );








    } //end render
}