import * as utils from "./client-utils.js"

var location = undefined;

function UpdateBackground() { //change the background image file to the one sent by the server
    if (this.status == 200) { //if successfully received a response
        console.log("response: " + this.responseText);
        var photoName = JSON.parse(this.responseText).files; //parses JSON string to an object. Gets response object element/property 'files'
        var divObj = document.getElementById("image"); 
        //add photos to html interface
        var elem = document.createElement("img");
        elem.setAttribute("src", photoName); 
        elem.setAttribute("alt", "Flower"); 
        divObj.appendChild(elem);
    }     
    else { alert("Error loading photos");} //if did not successfully receive a response
}
/*
function UpdateSound(soundObj) { //change the sound file to the one sent by the server
    
}
*/

export function CheckLocation(currNode) { //figure out if the location has changed
    if (location != currNode["location"]) { //if the location stored doesn't equal the new location
        location = currNode["location"]; //set the stored location to equal the new one
        console.log("going to get photo");
        utils.SendXML({"request": "UpdateBackground", "location": location}, UpdateBackground); //send a request for files and then update the background
        //console.log("going to get sound");
        //utils.SendXML({"request": "UpdateSound", "location": location}, UpdateSound); //send a request for files and then update the sound
    }
}