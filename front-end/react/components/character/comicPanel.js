import React from 'react';
import { Component } from 'react';
import ReactDOM  from 'react-dom';
import moment from 'moment';
import {IMAGE_POPUP_CUTOFF} from './characterPanel';

const COMIC_IMAGE_REF = 'comicImageRef';


export default class ComicPanel extends Component {

    constructor(props)
    {
        super();
        let me = this;

        this.state = {comicData: props.comicData, allowLink: this.computeAllowLink()};
        this.subscriptions = [];
        let sub1 = postal.subscribe({
            channel: "responsive",
            topic: "orientation.change",
            callback: function (data, envelope) {

                me.setState({allowLink: me.computeAllowLink()});
            }
        });
        this.subscriptions.push(sub1);
    }

    computeAllowLink()
    {
        let allowLink = true;
        if (window.innerHeight < IMAGE_POPUP_CUTOFF)
        {
            allowLink = false;
        }
        return allowLink;
    }

    componentWillMount()
    {
      //  console.log("did mount");
    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


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

 
     componentDidUpdate(nextProps, nextState)
    {
        
       //  console.log("did update")
          let imageRef = ReactDOM.findDOMNode(this.refs[COMIC_IMAGE_REF]);
        let newSrc = this.state.comicData.thumbnail;
       
        $(imageRef).attr('src', newSrc);
    }

    getBigImageLink()
    {
        if (this.state.comicData.thumbnail.indexOf('image_not_available') > 0
                || !this.state.allowLink)
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

