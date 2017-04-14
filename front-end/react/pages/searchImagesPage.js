import React from 'react';
import { Component } from 'react';
import deviantService from './../services/deviantService';
import TagSearchComponent from './../components/tagSearch/tagSearchComponent';
import SearchAttributes from './../components/tagSearch/searchAttributesComponent';
import ImageSelectorComponent from './../components/images/imageSelectorComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryTree from './../components/categoryTree'
import ReadOnlyFolderTree from './../components/morgueFolder/readOnlyFolderTree';
import FolderTarget from './../components/tagSearch/folderTarget';
import CurrentImageDisplay from './../components/tagSearch/currentImageDisplay';
import postal from 'postal';
import TagImageLoader from './../components/images/loaders/tagImageLoader';

 

export default class SearchImagesPage extends Component {
        
  constructor()
  {
      super();
     this.subscription = null;
     this.imageCount = 25;
     this.tagImageLoader = new TagImageLoader(this.imageCount);  
      
  }
  
 componentWillMount()
  {
      let me = this;
      this.state = {'selectedTab': 0 };
      this.subscription =  postal.subscribe({
               channel: "deviant-system",
               topic: "starting-search" ,
               callback: function(data,envelope)
               {
                   
                        me.setState({'selectedTab': 0})
                   
                   
               }
            });
  }
  
  componentWillUnmount () {
      
      this.subscription.unsubscribe();
       
  } 
  

  render() {
      var me = this;
    return (
       
       <section className="searchContainer grouping">
       <h2> Search For Images</h2>
            <div className="column70Left">
                 
                   
                
                    <div className="column50Left"><TagSearchComponent /></div> 
                    <div className="column50Right"><SearchAttributes /></div> 
                    
                 

                <div className="row">
                
                <table className="imageSelectorComponent table table-striped well">
                <tbody>
                <tr><td colSpan="2"></td></tr>
                <tr>
                <td className="imageComponentTableCell">
                     <ImageSelectorComponent showFolderInfo={true} imageLoader={me.tagImageLoader} />
                </td><td  className="currentImageTableCell">
                          <CurrentImageDisplay />
                 </td>
                </tr>
                </tbody>
                </table>
                
                 
               
                
                </div>
                
                
           </div>
           <div className="column30Right">
                  <div className="row">
                    <div className="row">
                      <h3>MorgueFolders</h3>
                    </div>
                    <div className="row">
                      <ReadOnlyFolderTree />
                    </div>
                 </div>
                 <div className="row">
                 <FolderTarget ref="folderTarget" />
                 </div>
           </div>
       </section>
    );
  }
}