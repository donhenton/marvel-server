import React from 'react';
import { Component } from 'react';
import ReactDOM  from 'react-dom';


const IMAGE_REF = 'imageRef';
const LINK_TYPES =  
    {'detail': 'Detail',
        'wiki': 'Wiki Entry',
        'comiclink': 'Comic Link'}
 ;

export default class CharacterPanel extends Component {

    constructor(props)
    {
        super();
        this.state = {characterData: props.characterData};

    }

    componentWillMount()
    {

    }
    componentDidMount()
    {
        let imageRef = ReactDOM.findDOMNode(this.refs[IMAGE_REF]);
        // console.log("x1 "+imageRef)
        let img = new Image();
        let newSrc = this.state.characterData.imageUrl;
        // console.log("x2 "+newSrc)
        img.onload = function ()
        {
            //  console.log("x3 doswap")
            $(imageRef).attr('src', newSrc);
        }
        img.src = newSrc;

    }

    getCharacterLinks()
    {
        let links = [];
        this.state.characterData.urls.forEach(link => {
            let type = LINK_TYPES[link.type];
         //   console.log("type is " + type)
            let linkItem = <a className='character-link' target='_blank' href={link.url}>{type}</a>

            links.push(<li  key={link.type}  >{linkItem}</li>);
        })



            return <ul>{links}</ul>;
    }
    
    showModal()
    {
        
         postal.publish({
            channel: "character.page",
            topic: "characters.modal",
            data: {characterData: this.state.characterData }
        });
        
    }

    render()
    {

        return (
                <div className='character-panel grouping'>
                 <div  onClick={this.showModal.bind(this)} className='character-name'>{this.state.characterData.name}</div>
                    <div className="character-block grouping">
                        <div onClick={this.showModal.bind(this)} className='image-item'>
                        <img ref={IMAGE_REF} src="css/imgs/medium_na.jpg" /> 
                        </div>
                        <div className="character-link-block">
                            {this.getCharacterLinks()}
                        </div>
                    </div>        
                
                   
                </div>

                )

    }

}

