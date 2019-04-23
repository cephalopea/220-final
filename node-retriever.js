var utils = require("./server-utils.js");
var fs = require("fs");
//var sampleNode = {"id": 1, "parent": 0, "type": "user", "text": "I spin around in a circle.", "location": "field"};
var txtDB = "/publichtml/txt/fake-db.txt";

function LoadAllNodes(filepath) { //gets all the nodes from the txt file database
    //assumes txt file is formatted with each node on a newline, commas between key/val pairs, and = between key and value (no colon)
    //sample input line:
    //id=1\\parent=0\\type=user\\text=I spin around in a circle.\\location=field
    var finalNodes = []; //holds all the nodes retrieved from the database/txt doc
    var nodeDoc = fs.readFileSync(filepath).toString(); //read everything in the txt doc and convert to string
    var addNodes = nodeDoc.split("\n"); //split the string at newlines (split into nodes)
    for (let node in addNodes) { //for each string that represents a node
        var finishedNode = {}; //create empty dict for finished node
        var nodeBits = node.split("\\"); //split the nodes at the \\ symbol used to separate key/val pairs
        for (let trait in nodeBits) { //for each key/val pair in the node
            var keyval = trait.split("="); //divide the key and the value at the = symbol
            finishedNode[keyval[0]] = keyval[1]; //add the key and the value to the node object (finishedNode)
        }
        finalNodes.push(finishedNode); //add finishedNode to the collection of all the nodes
    }
    return finalNodes; //return all the nodes
}

exports.AddNewNode = (res, newNode) => {
    //turn the new node into text
    //append the new node to the text file OR add it to the database, depending on implementation
    //return the node via ajax to the client so it can be added to the entry page
    var sendObj = {nodes: newNode}; //make an object (sendObj) to send that contains the child nodes of our selected parent
    utils.sendJSONObj(res, 200, sendObj); //send a JSON obj to client with sendObj
}

exports.GetNextNodes = (res, prevNodeText) => { //gets the child nodes of a given node based on that node's text content
    //probably use sql database to store nodes, for now gonna use a text file
    //get the children of this node
    //should have attributes: id (a unique int), type (user or auth), text (the text displayed to the user), and parent (parent's unique int)
    var nodes = LoadAllNodes(txtDB); //get all the nodes
    var nodesToLoad = undefined; //create a variable to hold the child nodes and set it explicitly to undefined for now
    if (prevNodeText == "ROOT") { //if the "previous node" is just \ROOT
        nodesToLoad = nodes.filter(node => { //filter all the nodes and assign the returned nodes to nodesToLoad
            return(node["id"] == 0); //just get the one with id=0 (the initial node)
        });
    } else if (prevNodeText == "ALL") { //this is the entry script trying to load all the nodes
        nodesToLoad = nodes; //load all the nodes
    } else { //otherwise we have a real node loaded for the user
        var prevNode = nodes.filter(node => { //filter all the nodes and assign the returned nodes to prevNode
            return(node["text"] == prevNodeText); //return the node whose text matches the text the user picked
        });
        nodesToLoad = nodes.filter(node => { //filter all the nodes and assigned the returned nodes to nodesToLoad
            return(node["parent"] == prevNode["id"]); //return all the nodes whose parent is prevNode
        });
    }
    var sendObj = {nodes: nodesToLoad}; //make an object (sendObj) to send that contains the child nodes of our selected parent
    utils.sendJSONObj(res, 200, sendObj); //send a JSON obj to client with sendObj
}