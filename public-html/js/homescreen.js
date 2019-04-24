import * as utils from "./client-utils.js";
import * as gameCode from "./choice-handler.js";

//assume all this code is garbage

function getSave() { //checks the password
    inputUser = document.getElementById("user").value;
    inputPassword = document.getElementById("pass").value;
    utils.SendXML({request: "CheckPassword", user: inputUser, password: inputPassword}, loadSave); //get all the nodes, then add to page
}

function loadSave(data) {
    var save = JSON.parse(data.srcElement.responseText);
    if (save["isValidSave"]) {
        utils.SendNewPageXML("game.html", {request: "LoadSaveFile", savePoint: save["node"], isNewGame: "false"});
    } else {
        document.getElementById("passMessage").innerHTML =  "Password incorrect, please try again."; //display incorrect password message
    }
}

function newGame(data) {
    utils.SendNewPageXML("game.html", {request: "GetNextNodes", text: "ROOT" isNewGame: "true"});
}

function init() {
    document.getElementById("loadSave").addEventListener("click", getSave);
    document.getElementById("startNewGame").addEventListener("click", newGame);
}
