var utils = import("./client-utils.js");

var location = undefined;

function UpdateBackground(backgroundObj) { //change the background image file to the one sent by the server
    return backgroundObj["image"];
}

function UpdateSound(soundObj) { //change the sound file to the one sent by the server
    return soundObj["soundfile"]
}

function CheckLocation(currNode) { //figure out if the location has changed
    if (location != currNode["location"]) { //if the location stored doesn't equal the new location
        location = currNode["location"]; //set the stored location to equal the new one
        utils.SendXML({"request": "UpdateBackground", "location": location}, UpdateBackground); //send a request for files and then update the background
        utils.SendXML({"request": "UpdateSound", "location": location}, UpdateSound); //send a request for files and then update the sound
    }
}