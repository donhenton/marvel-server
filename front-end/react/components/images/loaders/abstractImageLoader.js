
export default class AbstractImageLoader
{
    
    constructor(imageLimit)
    {

        this.storedState = {};
        this.imageCount = imageLimit;
        if (!this.imageCount)
        {
            this.imageCount = 5;
        }
        this.pushFunction = null;
  
    }
    
    setStoredState(s)
    {
        this.storedState = s;
    }
    
    getStoredState() 
    {
        return this.storedState;
    }
    
    getImageCount()
    {
        return this.imageCount;
    }
    
    /**
     * signature on the f variable is handle(imageData.getPageData());
     */
    setPushFunction(f)
    {
        this.pushFunction = f;
    }
 

    getPage(offset)
    {
    
            throw new Error("you must fill in getPage method");
       
    }
    
    /**
     * optional for tying into the imageSelector component life cycle
     */
    onUnMount()
    {
       
        
    }

    onMount()
    {
        
        
    }

}

