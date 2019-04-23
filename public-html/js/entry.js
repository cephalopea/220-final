var utils = import("./client-utils.js");

var textDiv;
var form;
var formDiv;

//var sampleNode = {"id": 1, "parent": 0, "type": "user", "text": "I spin around in a circle.", "location": "field"};

function init() {
    textDiv = document.getElementById("text");
    form = document.getElementById("pass");
    formDiv = document.getElementById("form");
    textDiv.innerHTML = "";
    document.getElementById("sub").addEventListener("click", checkPassword);
    return true;
}

function addNodeInfo(nodes) { //spawns the entry form for adding new nodes
    for (let node of nodes) {
        var nodePar = document.createElement("div"); //create paragraph elem to hold node info
        nodePar.innerHTML = "<p>id: " + node.id + "</p><p>parent: " + node.parent + "</p><p>type: " + node.type + "</p><p>text: " + node.text + "</p><p>location: " + node.location + "</p>"; //add node info to parent elem
        textDiv.appendChild(nodePar); //add paragraph elem to text div
        nodePar.addEventListener("click", addChildNodeForm); //add event listener to create a new child when node is clicked
    }
    return true;
}

function addChildNodeForm() { //creates a form to add a child node
    var newForm = document.createElement("form"); //create a form
    var idField = document.createElement("input"); //create an id field for new node
    idField.setAttribute("type", "text"); //set to text field
    var parentField = document.createElement("input"); //create an parent id field for new node
    parentField.setAttribute("type", "text"); //set to text field
    parentField.setAttribute("value", this.childNodes[0].split(" ")[1]); //set default value to clicked node's id
    var typeField = document.createElement("input"); //create a type field for new node
    typeField.setAttribute("type", "text"); //set to text field
    var textField = document.createElement("input"); //create a text field for new node
    textField.setAttribute("type", "text"); //set to text field
    var locationField = document.createElement("input"); //create a location field for new node
    locationField.setAttribute("type", "text"); //set to text field
    parentField.setAttribute("value", this.childNodes[4].split(" ")[1]); //set default value to clicked node's location
    var submitButton = document.createElement("input"); //create a submit button for new node
    submitButton.setAttribute("type", "submit"); //set to submit button
    
    newForm.appendChild(idField); //append all child elems to new form
    newForm.appendChild(parentField);
    newForm.appendChild(typeField);
    newForm.appendChild(textField);
    newForm.appendChild(locationField);
    newForm.appendChild(submitButton);
    
    textDiv.appendChild(newForm); //append form to text div
}

function checkPassword() { //checks the password
    if (form.value == "dundermifflin") { //if the password is correct
        formDiv.innerHTML = ""; //remove the password field
        utils.sendXML({request: "GetNextNodes", text: "\ALL"}, addNodeInfo); //get all the nodes, then add to page
    } else {
        textDiv.innerHTML = "<p>Password incorrect, please try again.</p>"; //display incorrect password message
    }
    return true;
}

init();