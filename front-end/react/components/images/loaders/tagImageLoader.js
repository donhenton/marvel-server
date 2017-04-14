import postal from 'postal';
import deviantService from './../../../services/deviantService';
import ImageData from './../../../services/classes/ImageData';
import AbstractImageLoader from './abstractImageLoader';


export default class TagImageLoader extends AbstractImageLoader
{
    
    constructor(imageLimit)
    {
        super(imageLimit);
        this.tag = null;
        this.setStoredState({hasMore: false, hasLess: false, offset: 0, imagePageData: null} ); 
  
    }
 
    getPage(offset)
    {
       let me = this;
       return deviantService.getTagImages(this.tag,offset,this.imageCount)
        .then(function(data)
        {
            let parseData = JSON.parse(data);
            let imageData = new ImageData(parseData);
            let packagedData = imageData.getPageData();
            packagedData.hasLess = true;
            if (offset == 0)
                packagedData.hasLess = false;
            
            
            
            me.pushFunction(packagedData)
           
            
        }).catch(function(err)
        {
            //would handle error here by calling push function with error
            //data
            throw new Error(err.message);
        })
        
    }
    
    /**
     * optional for tying into the imageSelector component life cycle
     */
    onUnMount()
    {
        //console.log("did unsub 1")
        this.subscription.unsubscribe();
        
        
    }

    onMount()
    {
        let me = this;
        //console.log("did subsribe 1")
        this.subscription = postal.subscribe({
                channel: "deviant-system",
                        topic: "select-tag",
                        callback: function (data, envelope) {
                              
                                me.tag = data.tag;
                                me.getPage(0,me.imageCount);
                             
                        }
               });
        
    }

}

