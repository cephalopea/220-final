import * as utils from "./client-utils.js";

var textDiv = undefined;
var form = undefined;
var formDiv = undefined;
var passField = undefined;
var nextID = undefined;

function init() {
    nextID = 0;
    textDiv = document.getElementById("text");
    form = document.getElementById("password");
    passField = document.getElementById("pass");
    formDiv = document.getElementById("form");
    textDiv.innerHTML = "";
    document.getElementById("sub").addEventListener("click", checkPassword);
    return true;
}

function addNodeInfo(data) { //spawns the entry form for adding new nodes
    var nodes = JSON.parse(data.srcElement.responseText);
    for (let node of nodes["nodes"]) {
        var nodePar = document.createElement("div"); //create paragraph elem to hold node info
        nodePar.classList.add("nodeDesc");
        if (node.id > nextID) { //check if the next available id needs to be incremented
            nextID = node.id; //set id equal to larger, taken, id
            nextID++; //increment next id by 1
        }
        nodePar.innerHTML = "<p>id: " + node.id + "</p><p>parent: " + node.parent + "</p><p>type: " + node.type + "</p><p>text: " + node.text + "</p><p>location: " + node.location + "</p>"; //add node info to parent elem
        textDiv.appendChild(nodePar); //add paragraph elem to text div
        nodePar.addEventListener("click", addChildNodeForm); //add event listener to create a new child when node is clicked
    }
    console.log("got here");
    return true;
}

function addChildNodeForm() { //creates a form to add a child node
    var newForm = document.createElement("form"); //create a form
    var idField = document.createElement("p"); //create an id for new node
    idField.innerHTML = nextID; //set text to next available id
    nextID++; //increment next id
    var parentField = document.createElement("input"); //create an parent id field for new node
    parentField.setAttribute("type", "text"); //set to text field
    parentField.setAttribute("value", this.childNodes[0].innerHTML.split(" ")[1]); //set default value to clicked node's id
    var typeField = document.createElement("input"); //create a type field for new node
    typeField.setAttribute("type", "text"); //set to text field
    var textField = document.createElement("input"); //create a text field for new node
    textField.setAttribute("type", "text"); //set to text field
    var locationField = document.createElement("input"); //create a location field for new node
    locationField.setAttribute("type", "text"); //set to text field
    locationField.setAttribute("value", this.childNodes[4].innerHTML.split(" ")[1]); //set default value to clicked node's location
    var submitButton = document.createElement("input"); //create a submit button for new node
    submitButton.setAttribute("type", "button"); //set to button
    submitButton.setAttribute("value", "Add Node"); //set to button
    
    newForm.appendChild(idField); //append all child elems to new form
    newForm.appendChild(parentField);
    newForm.appendChild(typeField);
    newForm.appendChild(textField);
    newForm.appendChild(locationField);
    newForm.appendChild(submitButton);
    
    newForm.addEventListener("click", enterChildNode); //add submit event listener to form
    
    textDiv.appendChild(newForm); //append form to text div
    
    return true;
}

function enterChildNode() {
    var fields = this.parent.childNodes; //first five are attributes, last is submit button
    var newNode = {}; //create empty node
    newNode.id = fields[0].innerHTML; //add assigned id
    newNode.parent = fields[1].value; //add user-entered node characteristics from form
    newNode.type = fields[2].value;
    newNode.text = fields[3].value;
    newNode.location = fields[4].value;
    this.parent.removeChild(this); //remove this form from the page
    utils.SendXML({request: "AddNewNode", node: newNode}, addNodeInfo); //send new node to server
    //^^this functionality isn't fully implemented yet on the server side
    return true;
}

function checkPassword() { //checks the password
    if (passField.value == "dundermifflin") { //if the password is correct
        formDiv.innerHTML = ""; //remove the password field
        utils.SendXML({request: "GetNextNodes", text: "ALL"}, addNodeInfo); //get all the nodes, then add to page
    } else {
        console.log("oops")
        textDiv.innerHTML = "<p>Password incorrect, please try again.</p>"; //display incorrect password message
    }
    return true;
}

init();