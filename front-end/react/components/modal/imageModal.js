import React from 'react';
import { Component } from 'react';
import Modal from './modal';


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
export default class ImageModal extends Component {

    constructor(props)
    {

        super(props);
        this.internalModal = null;
        this.state = {imageUrl: props.imageUrl}

    }

    componentDidMount()
    {


    }

    componentWillMount()
    {


        this.state = {isOpen: false};
        var me = this;

    }

   

    cancel()
    {

        this.internalModal.cancel();
    } 

    open(finalImageUrl)
    {
        let top = $('.main-content').scrollTop();
        this.setState({imageUrl:finalImageUrl},function() 
        {
             this.internalModal.open(top);
        })
      
    }

    render()
    {

        var me = this;

        return (
                <Modal modalClassName={this.props.modalClassName} modalLabel={this.state.characterId} ref={(ref) => me.internalModal = ref}>
                    <div className="big-image">
                    <img src={this.state.imageUrl} />
                        
                    </div>
                </Modal>
                )


    }

}
 