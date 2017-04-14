import React from 'react';
import { Component } from 'react';
import deviantService from './../../services/deviantService';
import ReactDOM from 'react-dom';
import postal from 'postal';



export default class TagSearchPage extends Component  
{
    
   constructor()
  {
      super();
      
      this._isMounted = false;
      this.handleDocumentClick = this.handleClick.bind(this)
       
  }
  componentDidMount()
  {
      this._isMounted = true;
  }
  
  componentWillMount()
  {
      this.state = {'value': "",options: [], downloading: false,initialized: false};
     // console.log("adding handler")
      window.document.addEventListener('click', this.handleDocumentClick,true);
      
  }
  
  componentWillUnmount () {
     //console.log("removing handler")
      this._isMounted = false;
      
    window.document.removeEventListener('click', this.handleDocumentClick,true)
  }
  
  handleClick(evt) {
 
         var classVar = $(evt.target).attr('class');
       //  console.log("handle doc click ")
         //click on a tag search list item doesn't reset state
         if (classVar === 'tagSearchItem' || classVar === 'tagSearchInput')
         {
             return;
         }
         
         this.resetState();
         
     
  }
  
  onTagClick(tagName)
  {
      console.log("clicked "+tagName)
      postal.publish({
               channel: "deviant-system",
               topic: "select-tag" ,
               data:  {tag: tagName}
            });
        
      this.resetState();      
            
  }
  
        
  renderOptions()
  {
      
       let opts = [];
       let idx = 0;
       let me = this;
      
      this.state.options.map((o) => {
          
          opts.push (<div className="tagSearchItem" onClick={me.onTagClick.bind(me,o.value)} key={idx}>{o.label}</div>)
          idx ++ ;
          
      })
      
      return opts;
  }
  
  getCSSForList(cssBase)
  {
      var css = cssBase + " "
      if (this.state.value.length===0 && this.state.options.length === 0)
      {
         css = css + "hidden" 
      }
      
      return css;
  }
  getIndicatorCSS()
  {
       var css = "waitIndicator hidden";
      if (this.state.downloading)
      {
         css = "waitIndicator"
      }
      return css;
  }
  
  
  resetState()
  {
      
      this.setState({value: "", options: [],downloading: false})
 
  }
  
  onKeyUp(e)
  {
       
      if (e.keyCode == 27)
      {
           this.resetState();
      }
      
  }
        
  render() {
      var me = this;
    return (
       
        <div className="tagSearchContainer">
            <table>
              <tbody>
                <tr>
                    <td  className="entryBoxContainer">
                        <input placeholder="Search For..." onKeyUp={me.onKeyUp.bind(me)} size="50" className="tagSearchInput" value={this.state.value} onChange={this.onChange.bind(this)} id="tagSearchInput" /> 

                        <span className = "search"> <i className = "fi-magnifying-glass" > </i></span>
                     
                    </td><td>
                      <img className={me.getIndicatorCSS( )} src="css/images/spiffygif_30x30.gif" /> 
                  </td> 
                </tr>
            </tbody>
          </table>
          <section className={me.getCSSForList('tagSearchList')}>
             {me.renderOptions()}      
          </section>
            
       </div>
       
       
    );
  } 
    
    
 
    getOptions(searchTag) {
           // console.log("search for '"+searchTag+"'")
            var me = this;
            if (searchTag && searchTag.length >=3)
            {
                me.setState({downloading: true})
                return deviantService.searchTag(searchTag).then(function(data) 
                {
                    me.setState({options: data,downloading: false});
                })
                        .catch(function(err){
                           return new Error(err.message);


                });
           }
           else
           {
               me.setState({options: [],downloading: false})
           }    

    };

    onChange(e)
    {
        this.getOptions(e.target.value);
        this.setState({  value: e.target.value});
        
         postal.publish({
               channel: "deviant-system",
               topic: "starting-search" ,
               data:  {}
            });   
    }
       
}