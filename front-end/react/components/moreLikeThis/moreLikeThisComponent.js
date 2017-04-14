import React from 'react';
import { Component } from 'react';
import MoreLikeThisImageLoader from './../images/loaders/MoreLikeThisImageLoader';
import ImageSelectorComponent from './../images/imageSelectorComponent';
import postal from 'postal';
import storageService from './../../services/storageService';




export default class MoreLikeThisComponent extends Component {

    constructor()
    {
        super();
        this.imageCount = 25;
        this.moreLikeThisImageLoader = new MoreLikeThisImageLoader(this.imageCount);
        this.subscriptions = [];

    }

    componentWillMount() {

        let me = this;
        let sub1 = postal.subscribe({
            channel: "moreLikeThis.channel",
            topic: "select-image",
            callback: function (data, envelope) {


                let retVal = window.confirm("Do you want to add this image to '"+me.state.folderData.name+"'?");

                if (retVal)
                {

                    storageService.insertIntoFolder(data, me.state.folderData);
                    let sv = !me.state.refresh;
                    me.setState({refresh: sv, isProcessing: false})
                }
            }
        });


        this.state = {refresh: false, folderData: this.props.folderData, isProcessing: this.props.isProcessing}
        this.subscriptions.push(sub1);

    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({folderData: nextProps.folderData, isProcessing: nextProps.isProcessing})

    }

    componentWillUnmount() {

        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];

    }

    render()
    {
        let me = this;

        return (
<div className="moreLikeThisComponent">
    <ImageSelectorComponent showFolderInfo={true} isProcessing={this.state.isProcessing} postalChannel={'moreLikeThis.channel'}  imageLoader={me.moreLikeThisImageLoader} />
</div>







                )

    }

}

 