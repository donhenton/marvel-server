import React from 'react';
import { Component } from 'react';
import postal from 'postal';
import WaitIndicator from './../waitIndicator';

export default class SingleImageDisplay extends Component  
{
    
   constructor()
  {
      super();
      this.subscription = null;
  }
         
   componentWillUnmount () {
      
      if (this.subscription)
      {
          this.subscription.unsubscribe();
          this.subscription = null;
      }
       
  } 

  
  componentWillReceiveProps(nextProps)
  {
      this.setState({imageData: nextProps.imageData});
  }
  
  componentWillMount()
  {
      let me = this;
      this.subscription = postal.subscribe({
                channel: "deviant-system",
                topic: "select-image" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        if ($("div.imageWrapper")[0])
                        {
                            $("div.imageWrapper")[0].scrollTop = 0;
                        }
                        
                        let currentId = null;
                        if (me.state.imageData)
                        {
                            currentId = me.state.imageData["deviationid"];
                        }
                        
                        if (currentId != data["deviationid"])    
                        {
                           // console.log("got a change!!!!")
                            me.setState({'imageData': data, isProcessing: true});
                        }
                        

                }
               });
      this.state = {imageData: me.props.imageData, didTransfer: false ,isProcessing: false};
       
      
  }
  
    
   
   //////DND ///////////////////////////////////////////////////////////////
   
   sourceDragStart(e)
   {
       
       e.target.style.opacity = 0.2;
       e.dataTransfer.setData('application/json',JSON.stringify(this.state.imageData))
       e.dataTransfer.effectAllowed = 'move';
   }
   
   sourceDragEnd(e)
   {
       if(e.dataTransfer.dropEffect !== 'none'){
         
         //do the stuff to set up 
         this.setState({didTransfer: true})
         $("div.imageWrapper")[0].scrollTop = 0;
 
           
       }
       else
       {
          // console.log("you bailed")
       }
       e.target.style.opacity = 1;
       
   }
   
   
   handleImageLoaded() {
     // console.log("image load "+this.currentCounter+" target "+this.loadTargetCount)
      this.setState({isProcessing: false,didTransfer: false})
     
  }
 
  handleImageErrored(e) {
     //console.log("image error ");
     //$(e.target).closest('span.deviantThumb').hide();
     this.setState({isProcessing: false,didTransfer: false})
  }
   
     
   addImageSelectedLabel() 
   {
       let message = this.props.completeMessage;
       if (message)
       {  
       
       if (this.state.didTransfer)

          return  <span className="completedText">{message}</span> 
        
       }
       return null;
   }
   
   
   ////////////////////////////////////////////////////////////////////////
   
 
        
   render() {
            var me = this;
            if (this.state.imageData)
            {
                 return (
                    <div>
                 
                        <WaitIndicator isProcessing={me.state.isProcessing} />     



                        <div className="imageWrapper">
                            <div className="imageExpander">
                                <img 
                                 onDragStart={me.sourceDragStart.bind(me)}
                                 onDragEnd={me.sourceDragEnd.bind(me)}
                                 onLoad={this.handleImageLoaded.bind(this)}
                                 onError={this.handleImageErrored.bind(this)}
                                 className="currentImageDisplay" 
                                 src={this.state.imageData.thumbs[2].src} />

                                    {me.addImageSelectedLabel()}        
                            </div>

                        </div>         
                    </div>
                 )
            }
            else
            {
                return (
                   <div>  </div>
                 )
            }
        
        }
        
}