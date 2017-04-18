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
export default class CharacterModal extends Component {
        
   
    constructor(props)
    {
         
        super(props);
        this.internalModal  = null;
        this.list = null;
         
          
    }
    
    
   
   componentDidMount()
   {
         
            
   }
   
   componentWillMount()
        {

                
                this.state = {isOpen: false};
                var me = this;
                
        }
   
   
   
    
    componentWillReceiveProps(nextProps)
   {
      this.setState({isOpen: nextProps.isOpen});
   } 
    
   cancel()
   {
        
        this.internalModal.cancel();
   } 
   
   open()
   {
        
       this.internalModal.open();
   }
   
 
    
  render()
   {
            
           var me = this;
            
            return (
              <Modal modalLabel="Stuff" ref={(ref) =>me.internalModal = ref}>
                     <div className="third-list">
                         
                        <div className="row">
                            <button onClick={me.cancel.bind(me)} className="btn">Cancel</button>
                        </div>
                     </div>
              </Modal>
            ) 
            
         
   }
   
  
}
 