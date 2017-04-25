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
    //image_not_available
    getDate()
    {
        //"2008-10-29T00:00:00-0400",
        let mm = moment(this.state.comicData.date, "YYYY-MM-DD");
        return  mm.format("MM/DD/YYYY")
    }
    getBigImage(ev)
    {
        ev.preventDefault();
        let imageUrl = this.state.comicData.thumbnail.replace('portrait_xlarge', 'detail');
        postal.publish({
            channel: "image.request",
            topic: "display.comic",
            data: {imageUrl: imageUrl}
        });

    }

    getBigImageLink()
    {
        if (this.state.comicData.thumbnail.indexOf('image_not_available') > 0
                || window.innerHeight < 600  )
        {
            return <img ref={COMIC_IMAGE_REF} src="css/imgs/xlarge_na.jpg" />;
        } else
        {
            return <a href="#" onClick={this.getBigImage.bind(this)}>
                <img ref={COMIC_IMAGE_REF} src="css/imgs/xlarge_na.jpg" />
                <div className="link-text">(Click To Expand)</div>
            </a>;
        }


    }

    render()
    {

        return (
                <div className='comic-panel grouping'>
                    <div className='comic-title'>{this.state.comicData.title}</div>
                    <div className="comic-image">
                        {this.getBigImageLink()}
                    </div>
                    <div className='comic-info'>
                
                        <span className='comic-price'>$ {this.state.comicData.price.price}</span>
                        <span className='comic-date'>{this.getDate()}</span>
                    </div>
                
                </div>

                )

    }

}

