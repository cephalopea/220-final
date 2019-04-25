import * as utils from "./client-utils.js";
import * as gameCode from "./choice-handler.js";

//assume all this code is garbage

function GetSave() { //checks the password
    inputUser = document.getElementById("user").value; //get the username
    inputPassword = document.getElementById("pass").value; //get the password
    utils.SendXML({request: "CheckUser", user: inputUser, pass: inputPassword, isNewGame: false}, LoadSave); //send to server to check if user exists
}

function LoadSave(data) { //load a previous save file given by the user
    var info = JSON.parse(data.srcElement.responseText); //parse server response
    if (info["userExists"]) { //if the save exists
        utils.SendNewPageXML("game.html", {request: "LoadGame", user: info["user"], lastNode: info["node"]}, gameCode.LoadGame); //load it in choice-handler
    } else {
        document.getElementById("passMessage").innerHTML =  "Save file not found, please try again."; //display incorrect password message
    }
}

function NewGame() {
    var newGameDiv = this.parent; //get the div that holds the new game input fields/info
    newGameDiv.removeChild(this); //remove the new game button
    
    document.getElementById("newgameMessage").innerHTML = "Create a username and password below."
    
    var submitUser = document.createElement("button");
    submitUser.setAttribute("value", "Create User");
    submitUser.addEventListener("click", CheckIfUserFree);
    
    var userLabel = document.createElement("label");
    userLabel.setAttribute("id", "userField");
    userLabel.innerHTML = "Username: "
    
    var userField = document.createElement("input");
    userField.setAttribute("type", "text");
    
    var passLabel = document.createElement("label");
    passField.innerHTML = "Password: "
    
    var passField = document.createElement("input");
    passLabel.setAttribute("id", "passField");
    passField.setAttribute("type", "password");
    
    newGameDiv.appendChild(userLabel);
    newGameDiv.appendChild(userField);
    newGameDiv.appendChild(passLabel);
    newGameDiv.appendChild(passField);
    newGameDiv.appendChild(submitUser);
}

function CheckIfUserFree() {
    var user = document.getElementById("userField").value;
    var pass = document.getElementById("passField").value;
    utils.SendXML({request: "CheckUser", user: user, pass: pass, isNewGame: true}, VerifyNewUser);
}

function VerifyNewUser(data) {
    var info = JSON.parse(data.srcElement.responseText); //parse the response text
    if (!info["userExists"]) { //username was free
        utils.SendNewPageXML("game.html", {request: "LoadGame", user: info["user"], lastNode: "ROOT"}, gameCode.LoadGame); //load the game
    } else { //username was taken
        document.getElementById("newgameMessage").innerHTML = "This username is already taken. Please try another one." //tell user
    }
}

function init() {
    document.getElementById("loadSave").addEventListener("click", GetSave); //add event listeners
    document.getElementById("startNewGame").addEventListener("click", NewGame);
}

init();
