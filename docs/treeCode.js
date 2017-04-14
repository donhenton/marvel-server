/**
 * 
 * @param {type} categoryData new data coming in
 * @param {type} oldStore the store to add the raw keys to
 * @param {type} oldChildData the accumulator for the child array 
 *               will be null at start abd {keys,store} iteratively
 *               
 *               
 *               
 *   the data structure is {keys, store, treeData}
 *   
 *   keys are sorted by length(keys.sort give that)
 *   store is object where keys are full catpath and data is has_subcategory, title
 *   treeData is the store oranized for the tree {key, name, <optional: children>}
 *   
 *   http://stackoverflow.com/questions/23853782/how-to-sort-tree-of-folders
 * 
 * @returns {undefined}
 */
function addKeys(categoryData,data)
{
    var oldStore = {};
    if (data)
    {
        oldStore = data.store;
    }
    var newStore = clone(oldStore);
     
    //put the raw data into the store
    categoryData.categories.forEach(function(category)
    {
         newStore[category.catpath] = {has_subcategory: category.has_subcategory, 
         title: category.title};
      
    })
    
    var keys = Object.keys(newStore)
    keys = keys.sort(function(a,b)
    {
        return a.localeCompare(b)
    });
    
    //treeData
    
    treeData = {};
    
    var currentKey =null;
    var treeData = [];
    var currentTreeNode = null;
    var parentNodes = [];
    
    keys.forEach((k)=>{
         
         
         
         while (parentNodes.length > 0)
         {
              
            
            let pNode = parentNodes[parentNodes.length-1];
            //parent nodes key starts from 0 in current key
            // eg '/literature' starts '/literature/fanfiction'
             if (k.indexOf(pNode.key)== 0)
             {
                // console.log("parent "+pNode.key+" key "+k)
                let currentTreeNode = {};
                currentTreeNode.key= k;
                currentTreeNode.children = [];
                currentTreeNode.name = newStore[k].title;
                pNode.children.push(currentTreeNode);
                parentNodes.push(currentTreeNode);
                break;
             } 
             else
             {
                 parentNodes.pop();
                 
             }
             
             
             
         }
          
                 
         if (parentNodes.length == 0)
         {
             //initialize
             currentKey = k;
             let currentTreeNode = {};
             currentTreeNode.key= k;
             currentTreeNode.children = [];
             currentTreeNode.name = newStore[k].title;
             treeData.push(currentTreeNode);
             parentNodes.push(currentTreeNode);
              
         } 
         
          
        
    })
    
     
   // console.log(JSON.stringify(treeData))
    return {keys: keys, store: newStore, treeData: treeData};
    
}

function clone(item)
{
    return JSON.parse(JSON.stringify(item));
}