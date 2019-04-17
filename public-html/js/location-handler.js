var utils = require("./client-utils.js");

var location = None;

function UpdateBackground(backgroundObj) {
    return backgroundObj["image"];
}

function UpdateSound(soundObj) {
    return soundObj["soundfile"]
l}

function CheckLocation(currNode) {
    if (location != currNode["location"]) {
        location = currNode["location"];
        utils.SendXML({"request": "UpdateBackground", "location": location}, UpdateBackground);
        utils.SendXML({"request": "UpdateSound", "location": location}, UpdateSound);
    }
}