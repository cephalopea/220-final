var utils = require("./server-utils.js");
var fs = require("fs");
//var sampleNode = {"id": 1, "parent": 0, "type": "user", "text": "I spin around in a circle.", "location": "field"};
var txtDB = "/publichtml/txt/fake-db.txt";

function LoadAllNodes(filepath) {
    //assumes txt file is formatted with each node on a newline, commas between key/val pairs, and = between key and value (no colon)
    //sample:
    //id=1,parent=0,type=user,text=I spin around in a circle.,location=field
    var finalNodes = [];
    var nodeDoc = fs.readFileSync(filepath).toString();
    var addNodes = nodeDoc.split("\n");
    for (let node in addNodes) {
        var finishedNode = {};
        var nodeBits = node.split(",");
        for (let trait in nodeBits) {
            var keyval = trait.split("=");
            finishedNode[keyval[0]] = keyval[1];
        }
        finalNodes.push(finishedNode);
    }
    return finalNodes;
}

exports.GetNextNodes = (res, prevNodeText) => {
    //probably use sql database to store nodes, for now gonna use a text file
    //get the children of this node
    //should have attributes: id (a unique int), type (user or auth), text (the text displayed to the user), and parent (parent's unique int)
    var nodes = LoadAllNodes(txtDB);
    var nodesToLoad = None;
    if (prevNodeText == "\ROOT") {
        nodesToLoad = nodes.filter(node => {
            return(node["id"] == 0);
        });
    } else {
        var prevNode = nodes.filter(node => {
            return(node["text"] == prevNodeText);
        });
        nodesToLoad = nodes.filter(node => {
            return(node["parent"] == prevNode["id"]);
        });
    }
    var sendObj = {nodes: nodesToLoad};
    utils.sendJSONObj(res, 200, sendObj);
}