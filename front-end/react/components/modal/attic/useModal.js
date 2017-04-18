import React from 'react';
import { Component } from 'react';
import ListSystem from './listSystem';
import Reporting from './reporting'
import SelectButton from './selectButton'
import ThirdModal from './thirdModal'
import postal from 'postal';
import utils from './utils';
import storage from 'localStorage';
import {LOCALSTORE_KEY} from './../services/dataService';

export default class DoubleList extends Component {
        
    constructor()
    {
        super();
        this.tempQueue = utils.generateTempQueueName();
         
    }
    
    componentWillMount()
    {
         
    }
  
  showModal()
  {
      
        
        this.refs.selectionModal.open();
  }
  
  reportState(data)
  {
      
        var infoText = "";
        
        
        if ((typeof data) === 'string')
        {
            if (!data)
                data = {}
            else
                data = JSON.parse(data);
             
        }
        
        var info = {};
        for(var k in data)
        {

            info[k] = data[k].name
        }

       infoText = JSON.stringify(info);
        
        
        
        alert(infoText);
      
  }
  
  /**
   * example of using tempQueue and replyTo for a request-response
   * query of the current state
   */
  
  queryStateViaReplyTo()
  {
      var me = this;
       
      var channel = postal.channel('list-system');
      var subscription = channel.subscribe({ 
                          topic: me.tempQueue ,
                          callback: function (data, envelope) {
                              me.reportState(data)
                            
                            
                            subscription.unsubscribe();
                         }
               });
      
      channel.publish("queryState",{
          
          "channel": 'list-system',
          "replyTo": me.tempQueue,
          "data": {}
          
          
      })
      
  }
  
  queryStateViaLocalStorage()
  {
      //comes in as a string
      var data = storage.getItem(LOCALSTORE_KEY);
      this.reportState(data);
  }
     
  render() {
       
    return (
      
        <div>
                <div className="columnLeft">
                     <h2>Select Two Items</h2>
                </div>
                 <div className="columnRight">     
                     <button onClick={this.queryStateViaReplyTo.bind(this)} className="btn btn-primary pull-right btn-small">Query State Via ReplyTo</button> 
                     <button onClick={this.queryStateViaLocalStorage.bind(this)} className="btn btn-primary pull-right btn-small  space-right">Query State Via Local Storage</button> 
                 </div>    
          
             <hr className="clear"/>
          
             
            <table id="comparisonContainer">
                 <tbody>
                    <tr><td id="entryAlpha"><ListSystem listName="alpha"/></td>
                         <td id="vsText">and</td>
                         <td id="entryBeta"><ListSystem listName="beta"/></td></tr>



                   <tr><td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td id="compareButtonContainer"></td></tr>
                </tbody>
            </table>
    
            <div>
             
                <div className="columnRight">
                 <SelectButton  clickAction={this.showModal.bind(this)} />
                </div>
                <div className="columnLeft">
                <Reporting />
                </div>

            </div>
    
    
            <ThirdModal ref="selectionModal"  modalLabel="Select Third Restaurant" modalClassName="comparison-modal" />
            
    
      </div>
    
       
      
      
       
    );
  }
  
  
}