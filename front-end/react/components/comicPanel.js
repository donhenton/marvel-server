import React from 'react';
import { Component } from 'react';
import ReactDOM  from 'react-dom';


const COMIC_IMAGE_REF = 'comicImageRef';
 

export default class ComicPanel extends Component {

    constructor(props)
    {
        super();
        this.state = {comicData: props.comicData};

    }

    componentWillMount()
    {

    }
    componentDidMount()
    {
         
        let imageRef = ReactDOM.findDOMNode(this.refs[COMIC_IMAGE_REF]);
        let img = new Image();
        let newSrc = this.state.comicData.thumbnail;

        img.onload = function ()
        {
            //  console.log("x3 doswap")
            $(imageRef).attr('src', newSrc);
        }
        img.src = newSrc;
 
    }

     

    render()
    {

        return (
                <div className='comic-panel grouping'>
                   <img ref={COMIC_IMAGE_REF} src="css/imgs/xlarge_na.jpg" /> 
                     comic panel   
                
                   
                </div>

                )

    }

}

