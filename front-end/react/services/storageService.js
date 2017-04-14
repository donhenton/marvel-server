/**
 * 
 *  This service sits on top of the in memory image of the application data,
 *  and is responsible for loading from mongo and updating to mongo as the 
 *  user makes changes.
 */
import postal from 'postal';
import mongoService from './mongoService';

let emptyData =   {key: '/0','name': 'root', children: []};

class StorageService
{

    constructor()
    {
        this.deviationLookup = {};
        this.data = null;
        this.userId = null;
       
        let me = this;
        this.subscription = postal.subscribe({
            channel: "mongo-system",
            topic: "request-mongo-data",
            callback: function (data, envelope) {



                mongoService.getDataForUser(me.userId)
                        .then(function (data)
                        {
                            me.data = JSON.parse(data);
                            me.getIndex();
                            postal.publish({
                                channel: "mongo-system",
                                topic: "ack-mongo-data",
                                data: {ack: "OK"}
                            });

                        }).catch(function (err)
                {

                    throw new Error(err.message);
                })



            }
        });


    }
    
    setUserId(id)
    {
        this.userId = id;
    }

    setFolderData(data)
    {
        this.data = data;
    }

    deleteFromFolder(data, folder)
    {
        let key = folder.key;
        let targetFolder = this.getIndex()[key];
        targetFolder.deviations = targetFolder.deviations.filter((d) =>
        {
            return  d.deviationid !== data.deviationid;


        })

        this.persistData();
        this.getIndex();

    }

    persistData()
    {
      //  storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.getFolderData()));
       
      let me = this;
        mongoService.persistData(me.userId,me.getFolderData())
                        .then(function (ackData)
                        {
                             //{ack: "OK" }
                             return ackData;

                        }).catch(function (err)
                {

                    throw new Error(err.message);
                })
 
    }

    insertIntoFolder(data, folder)
    {
        let key = folder.key;
        let targetFolder = this.getIndex()[key];
        if (!targetFolder['deviations'])
        {
            targetFolder.deviations = [];
        }

        let checkIfPresent = targetFolder.deviations.filter((dev) => {

            return dev.deviationid === data.deviationid;


        })
        if (!(checkIfPresent) || checkIfPresent.length == 0)
        {
            targetFolder.deviations.push(data)
            this.persistData();
            postal.publish({
                channel: "deviant-system",
                topic: "folder-image-change",
                data: {folder: folder, data: data}
            });
            this.getIndex();
        }


    }

    /**
     * create the flatten key index
     * reset all keys to use the child array index eg /0/1/2
     * creates the deviationid index
     */
    flatten(data)
    {
        var accum = {}


        accum[data.key] = {'key': data.key, 'name': data.name, children: data.children}
        var me = this;
        me.deviationLookup = {};

        function recurse(children, parentKeyString)
        {
            for (var i = 0; i < children.length; i++)
            {
                children[i].key = parentKeyString + "/" + i;

                // accum[children[i].key] = {name: children[i].name,children: children[i].children};
                accum[children[i].key] = children[i];
                if (children[i].children.length > 0)
                {

                    recurse(children[i].children, children[i].key)
                }
                if (children[i].deviations)
                {
                    for (var k = 0; k < children[i].deviations.length; k++)
                    {
                        let cloneData = JSON.parse(JSON.stringify(children[i].deviations[k]));
                        cloneData.folderKey = children[i].key;
                        me.deviationLookup[children[i].deviations[k].deviationid] = cloneData;

                    }
                }


            }//end for loop

        }

        recurse(data.children, data.key)
        // console.log("XXXX\n"+JSON.stringify(this.deviationLookup))
        return accum;
    }

    getIndex()
    {
        return this.flatten(this.getFolderData());
    }

    getFolderData()
    {
        return this.data;
    }

    saveEdit(key, name)
    {
        let index = this.getIndex();
        let target = index[key];
        target.name = name;
        this.persistData();
        this.getIndex();
        return this.getFolderData();

    }

    addFolder(parentKey, name)
    {
        let index = this.getIndex();
        let target = index[parentKey];
        if (target.children)
        {
            target.children.push({name: name, key: "bonzo", children: []})
        } else
        {

        }
        this.getIndex();
        this.persistData();

        return this.getFolderData();
    }

    deleteFolder(key)
    {
        var keyparts = key.split("/");
        keyparts = keyparts.slice(1)
        if (keyparts.length == 1)
        {
            console.log("cannot delete the root")
            return this.getFolderData();
        }

        var parentKey = "";
        for (var i = 0; i < keyparts.length - 1; i++)
        {
            parentKey = parentKey + "/" + keyparts[i]

        }

        let deleteIndexString = keyparts[keyparts.length - 1];
        let deleteIndex = parseInt(deleteIndexString)
        //console.log("parent key "+ parentKey+" key "+key+ " deleteIndex "+ deleteIndex)
        let index = this.getIndex();
        let containingArray = index[parentKey].children;
        // console.log("will delete "+containingArray[deleteIndex].name)
        containingArray.splice(deleteIndex, 1)
        this.persistData();
        this.getIndex();
        return this.getFolderData();
    }



    getFolderDeviations(folderKey)
    {
        let index = this.getIndex();
        if (index[folderKey])
        {
            return index[folderKey].deviations;
        }



    }

    getFolderDeviation(deviationid)
    {
        let devInfo = this.deviationLookup[deviationid]

        if (devInfo)
        {
            let index = this.getIndex();
            devInfo['folderName'] = index[devInfo.folderKey].name;


        }
        return devInfo;
    }

}
let _storage = new StorageService();
export default _storage;