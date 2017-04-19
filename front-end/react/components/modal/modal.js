import React from 'react';
import { Component } from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

/**
 * simple modal
 * adapted from 
 * https://github.com/tryolabs/react-examples/tree/master/modal
 * http://blog.tryolabs.com/2015/04/13/a-reusable-modal-component-in-react/
 * 
 * PROPS:
 * 
 * modalLabel:          Text for the modal defaults to 'Modal Label'
 * 
 * transitionName:      the css class prefix for the animations for 
 *                      ReactCSSTransitionGroup
 * 
 * modalClassName       enclosing css class to allow for namespacing of 
 *                      modal css classes
 * 
 * 
 * 
 */
export default class Modal extends Component {

    constructor(props)
    {

        super(props);


    }

    componentWillMount()
    {


        var isOpen = false;
        if (this.props.isOpen)
        {
            isOpen = this.props.isOpen;
        }
        this.state = {isOpen: isOpen, displace: 0};

    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({isOpen: nextProps.isOpen, displace: nextProps.displace});
    }

    cancel()
    {
        postal.publish({
            channel: "modal",
            topic: "close",
            data: {}
        });
        this.setState({isOpen: false,displace:0});
    }

    open(displace)
    {

        this.setState({isOpen: true, displace: displace})
    }

    backgroundCSS()
    {
        var bkgValue = "modal-bkgMask";

        if (this.state.isOpen == false)
        {
            bkgValue = bkgValue + " modal-hidden";
        }

        return bkgValue;


    }

    render()
    {

        var me = this;
        let style = {top:this.state.displace};
         let styleItem = {top:(this.state.displace+5)};
        if (this.state.isOpen)
        {
            return (
                    <div className={this.props.modalClassName}>
                        <div  style={style} className={this.backgroundCSS()}></div>
                        <ReactCSSTransitionGroup  transitionName="modal-anim" transitionEnterTimeout={5} transitionLeaveTimeout={5}>
                    
                            <div  style={styleItem} className="modal">
                    
                                <div className="modalHeader"><span>{this.props.modalLabel}</span> <span onClick={this.cancel.bind(this)} className='btnClose'>X</span></div>
                                <div className="modalContent">
                                    {this.props.children}
                                </div>
                    
                            </div>  
                        </ReactCSSTransitionGroup>
                    </div>
                    )
        } else {
            return <ReactCSSTransitionGroup  transitionName="modal-anim" transitionEnterTimeout={5} transitionLeaveTimeout={5} />
        }

    }

}
// Modal.defaultProps = {
//    modalLabel: 'Default Label' ,
//    modalClassName: 'comparison-modal'
//};