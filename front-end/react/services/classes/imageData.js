 /**
  * class to take the results '/deviant/tagImages' call
  * and store it in a way that can be used for 
  */
export default class ImageData
{

           constructor(imageData)
           {
              this.imageData = imageData;
              this.listData = null;
              if (!this.imageData)
              {
                  throw new Error("cannot be null");
              }
              if (typeof this.imageData !== 'object')
              {
                  throw new Error("must be an object");
              }
              
             this.createListData();
    
           }
           
           clone(x)
           {
               return JSON.parse(JSON.stringify(x));
           }
           
 
           hasMore()
           {
               return this.imageData.has_more;
               
               
           }
           
           nextOffset()
           {
               return this.imageData.next_offset;
               
               
           }
           
           createListData()
           {
               this.listData =  
               
               this.imageData.results.map((imageHit) => {
                   
                   let listItem = null;
                   if (imageHit.content && imageHit.content.src  
                           && imageHit.preview && imageHit.preview.src)
                   {
                        listItem = {};

                        listItem["deviationid"] = imageHit.deviationid;
                        listItem["userid"] = imageHit.author.userid;
                        listItem['preview'] = null;
                        listItem['actualImage'] = null;
                        listItem['url'] = imageHit.url;
                        listItem['title'] = imageHit.title;
                        
                        listItem['preview'] = imageHit.preview.src;
                        listItem['actualImage'] = imageHit.content.src;
                        listItem["category"] = imageHit.category;
                        listItem['categoryPath'] = "/"+imageHit.category_path;


                        let thumbs = imageHit.thumbs;
                        thumbs = thumbs.sort(function(a,b)
                        {
                            return a.height > b.height;
                        })
                        listItem['thumbs'] = thumbs;

                       listItem['smallestThumb'] = thumbs[0]
                  }
                  
                   
                   return listItem;
               })
               
               
                this.listData = this.listData.filter((o)=>{ 
                  if (o)
                      return true;
                  else
                      return false;


                  })
               
               
           }
           
           getListData()
           {
                return this.clone(this.listData);
           }
           getPageData()
           {
                let pageData = {listData: this.clone(this.listData) };
                pageData['hasMore'] = this.imageData.has_more;
                pageData['nextOffset'] = this.imageData.next_offset;
                return pageData;
           }
          
}
