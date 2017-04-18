import React from 'react';
import { Component } from 'react';
import ReactDOM  from 'react-dom';
import CharacterModal from './modal/characterModal';

const IMAGE_REF = 'imageRef';
const LINK_TYPES =  
    {'detail': 'Detail',
        'wiki': 'Wiki Entry',
        'comiclink': 'Comic Link'}
 ;

export default class CharacterIndicator extends Component {

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
            console.log("type is " + type)
            let linkItem = <a className='character-link' target='_blank' href={link.url}>{type}</a>

            links.push(<li  key={link.type}  >{linkItem}</li>);
        })



            return <ul>{links}</ul>;
    }

    render()
    {

        return (
                <div className='character-panel grouping'>
                 <div className='character-name'>{this.state.characterData.name}</div>
                    <div className="character-block grouping">
                        <div className='image-item'><img ref='imageRef' src="css/imgs/medium_na.jpg" /> </div>
                        <div className="character-link-block">
                            {this.getCharacterLinks()}
                        </div>
                    </div>        
                
                   
                </div>

                )

    }

}

