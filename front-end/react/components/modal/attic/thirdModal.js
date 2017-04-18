 import React from 'react';
import { Component } from 'react';
import ListSystem from './listSystem'
import Modal from './reusable/modal';
import postal from 'postal';
import utils from './utils'
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
export default class ThirdModal extends Component {
        
   
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

                
                this.state = {selections:{}};
                var me = this;
                   
                 
               
               postal.subscribe({
                channel: "list-system",
                        topic: "makeSelection",
                        callback: function (data, envelope) {
                               
                               var newSelections =  utils.clone(me.state.selections);
                               newSelections[data.listName] =   data.item;
                               me.setState({selections: newSelections});
                              // console.log("listSystem Selections "+JSON.stringify(newSelections))                             
                                
                        }
               });   
               
               
               
               
               
               
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
              <Modal modalLabel="Select Third Resestaurant" ref={(ref) =>me.internalModal = ref}>
                     <div className="third-list">
                        <ListSystem ref="thirdList" selections={me.state.selections}  listName="gamma"/>
                        <div className="row">
                            <button onClick={me.cancel.bind(me)} className="btn btn-primary btn-red pull-right">Cancel</button>
                        </div>
                     </div>
              </Modal>
            ) 
            
         
   }
   
  
}
 