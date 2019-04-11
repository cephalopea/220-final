var utils = require("./client-utils.js");
var loc = require("./location-handler.js");

function SelectOption() {
    this.classList.remove("user");
    this.classList.add("history");
    this.style.textDecoration = "none";
    this.removeEventListener("click", SelectOption);
    this.removeEventListener("mouseover", AddUnderline);
    this.removeEventListener("mouseout", RemoveUnderline);
    var unchosenElems = document.getElementsByClassName("user");
    console.log(unchosenElems[0].innerHTML);
    console.log(unchosenElems[1].innerHTML);
    var elems;
    while (elems = document.getElementsByClassName("user")) {
        if (elems[0] == undefined) {
            break;
        } else {
            elems[0].parentNode.removeChild(elems[0]);
        }
    }
    utils.SendXML({"request": "GetNextNodes", "text": this.innerHTML}, LoadNodes);
}

function AddUnderline() {
    this.style.textDecoration = "underline";
}

function RemoveUnderline() {
    this.style.textDecoration = "none";
}

function LoadNodes(nodesToLoad) {
    var body = document.getElementsByTagName("body");
    var authNodes = nodesToLoad.filter(node => {
        return (node["type"] == "auth");
    })
    var authNode = authNodes[0]; //should only ever be one auth node at a time
    var userNodes = nodesToLoad.filter(node => {
        return (node["type"] == "user");
    })
    for (let node of authNodes) {
        var textRep = document.createElement("p");
        textRep.innerHTML = node["text"];
        textRep.classList.add("auth");
        body.appendChild(textRep);
    }
    for (let node of userNodes) {
        var textRep = document.createElement("p");
        textRep.innerHTML = node["text"];
        textRep.classList.add("user");
        body.appendChild(textRep);
        elem.addEventListener("click", SelectOption);
        elem.addEventListener("mouseover", AddUnderline);
        elem.addEventListener("mouseout", RemoveUnderline);
    }
    return authNode;
}

function UpdateBackground(backgroundObj) {
    
}

function init() {
    authNodes = utils.SendXML(LoadNodes, {"request": "GetNextNodes", "text": "\ROOT"});
    loc.CheckLocation(authNode);
}