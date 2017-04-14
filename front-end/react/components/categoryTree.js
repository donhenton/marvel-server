//import 'rc-tree/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from 'rc-tree';
import deviantService from './../services/deviantService';
import postal from 'postal';
import { Component } from 'react';


export default class CategoryTree extends Component {

    constructor()
    {
        super();


    }
    componentWillMount()
    {
        this.state = {treeData: [], checkedKeys: []};
    }

    componentDidMount() {

        var me = this;
        var retVal = deviantService.getCategories(null);

        retVal.then(function (data)
        {
            me.setState({treeData: data.treeData, store: data.store});
        });


    }
    onSelect(info) {
        //console.log('selected', info);
    }
    onCheck(checkedKeys) {
          console.log(checkedKeys);
        postal.publish({
            channel: "demo-deviant-system",
            topic: "select-category",
            data: {checkedKeys}
        });


        this.setState({
            checkedKeys,
        });
    }
    onLoadData(treeNode) {
        // console.log("current Request "+treeNode.props.eventKey);
        var me = this;

        var retVal = deviantService.getCategories(treeNode.props.eventKey);

        retVal.then(function (data)
        {
            me.setState({treeData: data.treeData, store: data.store});
        });

        return retVal;

    }
    
   
    
    
    render() {
        const loop = (data) => {
            return data.map((item) => {
                // console.log(item.key + " has "+item.has_subcategory)


                if (item.children.length > 0) {
                    return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
                }
                return <TreeNode title={item.name} key={item.key} isLeaf={!(item.has_subcategory)}  />;
            });
        };
        const treeNodes = loop(this.state.treeData);
        return (
                 
                        <div className="categoryTree">
                            <Tree checkStrictly={true} onSelect={this.onSelect.bind(this)} showLine={true}
                                  checkable={true} onCheck={this.onCheck.bind(this)} checkedKeys={this.state.checkedKeys}
                                  loadData={this.onLoadData.bind(this)}>
                                {treeNodes}
                            </Tree>
                        </div>
                    
                
                );
    }
};


 