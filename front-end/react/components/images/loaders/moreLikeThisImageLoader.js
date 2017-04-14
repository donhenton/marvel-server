import postal from 'postal';
import deviantService from './../../../services/deviantService';
import ImageData from './../../../services/classes/ImageData';
import AbstractImageLoader from './abstractImageLoader';


export default class MoreLikeThisImageLoader extends AbstractImageLoader
{

    constructor(imageLimit)
    {
        super(imageLimit);
        this.seed = null;
        this.setStoredState({isProcessing: true, hasMore: false, hasLess: false, offset: 0, imagePageData: null});
        this.subscriptions = [];

    }

    getPage(offset)
    {
        let me = this;
        return deviantService.getMoreLikeThis(this.seed, offset, this.imageCount)
                .then(function (data)
                {
                    let parseData = JSON.parse(data);
                    let imageData = new ImageData(parseData);
                    let packagedData = imageData.getPageData();
                    packagedData.hasLess = true;
                    if (offset == 0)
                        packagedData.hasLess = false;



                    me.pushFunction(packagedData)


                }).catch(function (err)
        {
            //would handle error here by calling push function with error
            //data
            throw new Error(err.message);
        })

    }

    /**
     * optional for tying into the imageSelector component life cycle
     */
    onUnMount()
    {
        //console.log("did unsub 1")
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];


    }

    onMount()
    {
        let me = this;
        //console.log("did subsribe 1")
        let s1 = postal.subscribe({
            channel: "deviant-system",
            topic: "select-seed",
            callback: function (data, envelope) {

                me.seed = data.imageData.deviationid;
                me.getPage(0, me.imageCount);

            }
        });

        this.subscriptions.push(s1);
        let s2 = postal.subscribe({
            channel: "deviant-system",
            topic: "select-target-folder",
            callback: function (data, envelope) {
                //zero out the display of more like this when changing folders
               let zeroData = {hasMore: false, listData: [], hasLess: false, offset: 0};
               
                me.pushFunction(zeroData);
             //  console.log("got a folder switch in more like this "+JSON.stringify(data));

            }
        });
        this.subscriptions.push(s2);
    }

}

