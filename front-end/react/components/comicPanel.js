import React from 'react';
import { Component } from 'react';
import ReactDOM  from 'react-dom';
import moment from 'moment';

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
    
    getDate()
    {
        //"2008-10-29T00:00:00-0400",
        let mm = moment(this.state.comicData.date,"YYYY-MM-DD");
        return  mm.format("MM/DD/YYYY")
    }

    render()
    {

        return (
                <div className='comic-panel grouping'>
                    <div className='comic-title'>{this.state.comicData.title}</div>
                    <img ref={COMIC_IMAGE_REF} src="css/imgs/xlarge_na.jpg" /> 
                
                    <div className='comic-info'>
                    
                    <span className='comic-price'>$ {this.state.comicData.price.price}</span>
                    <span className='comic-date'>{this.getDate()}</span>
                    </div>
                
                </div>

                )

    }

}
