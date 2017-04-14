
/**
 
 */
import postal from 'postal';
import deviantService from './deviantService'
import ImageData from './classes/imageData'

/**
 * this class is used by imageSelectorComponent services that provide images
 * will provide pages of images in the ImageData format. Specifically sits on
 * top of the deviant art service for image information, transforming the 
 * resultant call data into the ImageData format.
 */

class ImageLoader
{
    
    constructor()
    {
        let me = this;
        this.tag = null;
        


    }

    /**
     * paging function for imageSelectorComponent
     * the interface is getPage(offset,limit,tag<optional>)
     * 
     * 
     * 
     * 
     * 
     */
    getPage(offset,limit,tag)
    {
        
       return deviantService.getTagImages(tag,offset,limit)
        .then(function(data)
        {
            let parseData = JSON.parse(data);
            let imageData = new ImageData(parseData);
            return imageData.getPageData();;
            
        }).catch(function(err)
        {
            throw new Error(err.message);
        })
        
    }


 



}

var imageLoaderInstance = new ImageLoader();
export default imageLoaderInstance;
 