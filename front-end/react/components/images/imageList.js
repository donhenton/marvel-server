
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import postal from 'postal';
import WaitIndicator from './../waitIndicator';
import storageService from './../../services/storageService';

 
export default class ImageList extends Component  
{
    
   constructor()
  {
      super();
      this.currentCounter = 0;
      this.loadTargetCount = 0; 
      this.imageRefs=[];
      this.subscription = null;
  }
  
  
  
  componentWillReceiveProps(nextProps)
  {
      this.setState({isProcessing: nextProps.isProcessing})
      if (nextProps.imagePageData)
        this.loadTargetCount = nextProps.imagePageData.listData.length-1;
      else
        this.loadTargetCount = 0;  
  }
               
    componentWillUnmount () {
      
      this.subscription.unsubscribe();
       
  } 
  
  
  componentWillMount()
  {
       let me = this;
       this.state = {isProcessing: false,categories: []};
       this.subscription = postal.subscribe({
                channel: "deviant-system",
                        topic: "select-category",
                        callback: function (data, envelope) {
                              
                              console.log("categories are "+JSON.stringify(data.categories))
                                me.setState({'categories': data.categories});
                                 
                             
                        }
               });
      
 
  }
  
  counterCompleteCheck()
  {
     // console.log('current '+this.currentCounter+" target "+this.loadTargetCount)
      if (this.currentCounter == this.loadTargetCount)
      {
         // console.log("hit complete!!!!!!!!!!!!")
          this.loadTargetCount = 0;
          this.currentCounter = 0;
          this.setState({isProcessing: false});
      }
  }
  
  handleImageLoaded() {
     // console.log("image load "+this.currentCounter+" target "+this.loadTargetCount)
     this.currentCounter ++;
     this.counterCompleteCheck();
     
  }
 
  handleImageErrored(e) {
     //console.log("image error ");
     $(e.target).closest('span.deviantThumb').hide();
     this.currentCounter ++;
     this.counterCompleteCheck();
  }
  
  computeImageRef(ref)
  {
      //css selector in this case img#image-key-5
       this.imageRefs.push(ref);
  }
  
  computeImageCSS(imgData)
  {
      var css = "deviantThumb"
      return css;
  }
  
  
  clickOnImage(imageData)
  {
      let channel = 'deviant-system';
      if (this.props.postalChannel)
      {
         channel = this.props.postalChannel;   
      }
     // console.log("channel is "+channel)
      postal.publish({
               channel: channel,
                topic: "select-image" ,
               data:  imageData
            });
      
      
  }
  
   addImageSelectedLabel(folderInfo,imgData) 
   {
        
       
       if (folderInfo && this.props.showFolderInfo)

          return  (
              <div className="imageCover">
                <div className="containedText">
                    {'Image Added To '+folderInfo.folderName}        
                </div>
              </div> 
            )
       else
          return null;
   }
  
  
  
  renderImages()
  {
      var newImages = null;
      this.imageRefs = [];
      let me = this;
      let idx = 0;
      
      
      if (this.props.imagePageData && this.props.imagePageData.listData && this.props.imagePageData.listData.length > 0) 
      {
        newImages =  this.props.imagePageData.listData.map((imgData) => {
            if (imgData.smallestThumb && imgData.smallestThumb.src)
            {
             idx++;
             let containingFolder = storageService.getFolderDeviation(imgData.deviationid);
            // console.log("containingFolder "+containingFolder);
             let clickAction = me.clickOnImage.bind(me,imgData)
             var css = me.computeImageCSS(imgData)
            return ( 
                    <span  key={imgData.deviationid} className={css}>
                      
                                <div className="imageExpander"> 
                                {me.addImageSelectedLabel(containingFolder,imgData)} 
                                    <img onClick={clickAction} id={"image-key-"+idx} 
                                       ref={(ref) => me.computeImageRef(ref)} 
                                       onLoad={this.handleImageLoaded.bind(this)}
                                       onError={this.handleImageErrored.bind(this)}  
                                        src={imgData.smallestThumb.src} />
                                    
                                </div>
                        
                    </span>
                    )
            }
            else
            {
                return null;
            }
        

        })
      }
      
      return newImages;
  }
 
  getListContainerCSS()
  {
      let css = "imageListContainer row visible-visible";
      if (this.state.isProcessing)
          css =  "imageListContainer row visible-hidden";
      return css;
  }
        
  render() {
      var me = this;
    return (
                <div className="imageListControl">
                 <WaitIndicator isProcessing={this.state.isProcessing} />
                 <div className={me.getListContainerCSS()}>
                      {this.renderImages()}

                </div>
                </div>
       
        
    );
  } 
    
 
}