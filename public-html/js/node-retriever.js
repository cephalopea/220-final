var sampleNode = {"id": 1, "parent": 0, "type": "user", "text": "I spin around in a circle."};
var nodes = None;

function LoadAllNodes(filepath) {
    
}

function GetNextNodes(prevNodeText, callback) {
    //probably use sql database to store nodes, for now gonna use a text file
    //get the children of this node
    //should have attributes: id (a unique int), type (user or auth), text (the text displayed to the user), and parent (parent's unique int)
    var nodesToLoad = nodes.filter(node => {
        return(node["parent"] == prevNode["text"]);
    });
    callback(nodesToLoad);
}