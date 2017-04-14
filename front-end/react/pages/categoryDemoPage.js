import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import ReactDOM from 'react-dom';
import CategoryTree from './../components/categoryTree'


export default class CategoryDemoPage extends Component {

    constructor()
    {
        super();
        this.subscription = null;
    }

    componentWillMount()
    {
        this.state = {checkedKeys: []};
        let me = this;
        this.subscription = postal.subscribe({
            channel: "demo-deviant-system",
            topic: "select-category",
            callback: function (data, envelope) {
                //data: {categories: checkedKeys}
                me.setState({checkedKeys: data.checkedKeys});
            }
        });
        
         
    }

    componentWillUnmount() {
        if (this.subscription)
        {
            this.subscription.unsubscribe();
            this.subscription = null;
        }

    }

    renderKeys()
    {
        return this.state.checkedKeys.map((key) => {

                return (<li className="keyItem" key={key}><em><b>{key}</b></em></li>)

        })
    }

    render() {
        return (
            <div className="categoryDemo row grouping">  
                <div className="column50Left"> 
                    <h3>Deviant Art Categories</h3><br/>

                    <CategoryTree />

                </div>
                <div className="column50Right">
                    <h3>Selected Items</h3><br/>
                    <div className="categoryDemoList grouping"><ul>{this.renderKeys()}</ul></div>
                </div>
            </div>




                );
    }
}
