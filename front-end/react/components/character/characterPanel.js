import React from 'react';
import { Component } from 'react';
import ReactDOM  from 'react-dom';

export const IMAGE_POPUP_CUTOFF = 800;
const IMAGE_REF = 'imageRef';
const LINK_TYPES =
        {'detail': 'Detail',
            'wiki': 'Wiki Entry'};

export default class CharacterPanel extends Component {

    constructor(props)
    {
        super();
        this.state = {characterData: props.characterData, 
            allowLink: this.computeAllowLink(window.innerHeight)};
        this.subscriptions = [];
    }
    
    computeAllowLink(wHeight)
    {
        let allowLink = true;
        if (!wHeight)
        {
            wHeight = window.innerHeight;
        }
        if (wHeight < IMAGE_POPUP_CUTOFF)
        {
            allowLink = false;
        }
        return allowLink;
    }

    componentWillMount()
    {

        let me = this;
        let sub1 = postal.subscribe({
            channel: "responsive",
            topic: "orientation.change",
            callback: function (data, envelope) {
                
                     me.setState({allowLink: me.computeAllowLink(data.newHeight)});
            }
        });

        this.subscriptions.push(sub1);
    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


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
            if (type)
            {
                let linkItem = <a className='character-link' target='_blank' href={link.url}>{type}</a>
                links.push(<li  key={link.type}  >{linkItem}</li>);
            }

        })

        links.push(<li key='comic-link'><a  onClick={this.showModal.bind(this)} className='character-link'  href="#">Comics</a></li>)
        return <ul>{links}</ul>;
    }

    showModal(ev)
    {
        ev.preventDefault();
        postal.publish({
            channel: "character.page",
            topic: "characters.modal",
            data: {characterData: this.state.characterData}
        });

    }

    showHeroImage()
    {
        let imageUrl = this.state.characterData.imageUrl.replace('portrait_medium', 'detail');
        postal.publish({
            channel: "image.request",
            topic: "display.character",
            data: {imageUrl: imageUrl}
        });
    }

    getBigImageLink()
    {

        var nAIdx = this.state.characterData.imageUrl.indexOf("image_not_available");

        if ((!this.state.allowLink) || nAIdx > 0)
        {
            return (
                    <div  className='image-item no-pointer'>
                    
                        <img ref={IMAGE_REF} src="css/imgs/medium_na.jpg" /> 
                                        
                    </div>
                    )
        } else
        {
            return (
                    <div   onClick={this.showHeroImage.bind(this)} className='image-item'>
                    
                        <img ref={IMAGE_REF} src="css/imgs/medium_na.jpg" /> 
                    
                        <div className="link-action">(Click To Expand)</div>
                    </div>
                    )
        }


    }

    render()
    {

        return (
                <div className='character-panel grouping'>
                    <div  onClick={this.showModal.bind(this)} className='character-name'>{this.state.characterData.name}</div>
                    <div className="character-block grouping">
                        {this.getBigImageLink()}
                
                        <div className="character-link-block">
                            {this.getCharacterLinks()}
                        </div>
                    </div>        
                
                
                </div>

                )

    }

}
 