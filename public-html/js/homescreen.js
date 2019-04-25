import * as utils from "./client-utils.js";

//assume all this code is garbage

function GetSave() { //checks the password
    inputUser = document.getElementById("user").value;
    inputPassword = document.getElementById("pass").value;
    utils.SendXML({request: "CheckPassword", user: inputUser, password: inputPassword}); //get all the nodes, then add to page
}

function LoadSave(data) { //load a previous save file given by the user
    var save = JSON.parse(data.srcElement.responseText);
    if (save["isValidSave"]) {
        utils.SendNewPageXML("game.html", {request: "LoadSaveFile", save: save["node"], isNewGame: "false"});
    } else {
        document.getElementById("passMessage").innerHTML =  "Password incorrect, please try again."; //display incorrect password message
    }
}

function NewGame() {
    var newGameDiv = this.parent; //get the div that holds the new game input fields/info
    newGameDiv.removeChild(this); //remove the new game button
    
    document.getElementById("newgameMessage").innerHTML = "Create a username and password below."
    
    var submitUser = document.createElement("button");
    submitUser.setAttribute("value", "Create User");
    submitUser.addEventListener("click", CheckNewUser);
    
    var userField = document.createElement("input");
    
    var passField = document.createElement("input");

}

function CheckNewUser() {

}

function CreateSaveFile(data) {
    var save = JSON.parse(data.srcElement.responseText);
    utils.SendNewPageXML("game.html", {request: "GetNextNodes", user: save["user"], isNewGame: "true"});
}

function init() {
    document.getElementById("loadSave").addEventListener("click", GetSave);
    document.getElementById("startNewGame").addEventListener("click", NewGame);
}
