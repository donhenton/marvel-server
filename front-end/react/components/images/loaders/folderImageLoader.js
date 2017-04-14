import postal from 'postal';
import storageService from './../../../services/storageService';
import AbstractImageLoader from './abstractImageLoader';

export default class FolderImageLoader extends AbstractImageLoader
{

    constructor(imageLimit)
    {
        super(imageLimit);
        this.folderData = null;
        this.setStoredState({hasMore: false, hasLess: false, offset: 0, imagePageData: null});
        this.subscriptions = [];

    }

    activateSubscriptions()
    {
        let me = this;

        let s1 = postal.subscribe({
            channel: "deviant-system",
            topic: "select-target-folder",
            callback: function (data, envelope) {
                //{name: folderName , key: data.selectedKey }
              //  console.log("folderImage loader folder data " + JSON.stringify(data));
                me.folderData = data;
                me.getPage(0, me.imageCount);

            }
        });
        this.subscriptions.push(s1);
        let s2 = postal.subscribe({
            channel: "deviant-system",
            topic: "folder-image-change",
            callback: function (data, envelope) {
                //{name: folderName , key: data.selectedKey }
                // console.log("folderImage loader folder data " + JSON.stringify(data));
                // me.folderData = data;
                 me.getPage(0, me.imageCount);

            }
        });
        this.subscriptions.push(s2);





    }

    getFolderData()
    {
        return this.folderData;
    }

    checkForRefresh(data)
    {
        let me = this;
        if (me.folderData.key != data.key)
        {
            me.folderData = data;
            me.getPage(0, me.imageCount);
        }
    }

    deleteFromFolder(imageData)
    {
        storageService.deleteFromFolder(imageData, this.getFolderData());
        this.getPage(this.getStoredState().offset, this.imageCount);
    }

    getPage(offset)
    {
        let me = this;
        let imageData = storageService.getFolderDeviations(me.folderData.key);
        let hasMore = false;
        let nextOffset = 0;
        let imageCount = me.getImageCount();
        let sentData = [];
        let readLimit = -1;
        let hasLess = false;

        if (imageData)
        {
            let pageCount = Math.floor((imageData.length - offset) / imageCount);
            if (pageCount > 0)
            {
                hasMore = true;
                hasLess = true;
                nextOffset = offset + imageCount;
                if (offset == 0)
                {
                    hasLess = false;

                }
                readLimit = nextOffset;
                if (pageCount == 1 && imageData.length == imageCount)
                {
                    //exactly image count one page only
                    hasMore = false;
                    hasLess = false;
                    nextOffset = 0;
                    readLimit = imageCount - 1;
                }



            } else
            {
                hasMore = false;
                hasLess = false;
                let pageRemainder = imageData.length - offset;
                if (pageRemainder > 0)
                {
                    hasMore = false;
                    if (offset > 0)
                    {
                        hasLess = true;
                    }
                    nextOffset = -1;
                    readLimit = imageData.length;
                } else
                {
                    hasMore = false;
                    hasLess = false;
                    nextOffset = -1;
                    readLimit = 0;
                }
            }

            for (var i = offset; i < readLimit; i++)
            {
                sentData.push(imageData[i]);
            }


            let data = {hasMore: hasMore, hasLess: hasLess, nextOffset: nextOffset, listData: sentData}
            me.pushFunction(data);


        }
        else
        {
            //folder contains no images
            
            let data = {hasMore: false, hasLess: false, nextOffset: 0, listData: []};
            me.pushFunction(data);
            
            
            
        }

    }

    /**
     * optional for tying into the imageSelector component life cycle
     */
    onUnMount()
    {
        // console.log("did unsub 1 "+JSON.stringify(this.folderData))
        if (this.subscriptions.length > 0)
        {
            this.subscriptions.forEach(s => s.unsubscribe());
            this.subscriptions = [];
        }

    }

    onMount()
    {
        let me = this;

        if (this.subscriptions.length === 0)
        {
            // console.log("did subsribe 1 "+JSON.stringify(this.folderData))
            me.activateSubscriptions();
        }


    }

}

