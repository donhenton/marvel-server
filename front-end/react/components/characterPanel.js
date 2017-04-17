import React from 'react';
import { Component } from 'react';
import ReactDOM  from 'react-dom';

const IMAGE_REF = 'imageRef';

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
        img.onload = function()
        {
          //  console.log("x3 doswap")
            $(imageRef).attr('src',newSrc);
        }
        img.src = newSrc;
         
    }

    render()
    {

        return (
                <div className='character-panel box-item'>
                
                    <div className='image-item'><img ref='imageRef' src="css/imgs/medium_na.jpg" /> </div>
                    <div className='character-name'>{this.state.characterData.name}</div>
                </div>

                )

    }

}

