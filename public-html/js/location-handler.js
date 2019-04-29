//images from search.creativecommons.org
//sound files from freesound.org
import * as utils from "./client-utils.js"

var location = undefined;
var audio = null;

function UpdateBackground() { //change the background image file to the one sent by the server
    if (this.status == 200) { //if successfully received a response
        var photoName = this.responseText; //parses JSON string to an object. Gets response object element/property 'files'
        document.body.style.backgroundImage = "url("+photoName+")";
    }     
    else { alert("Error loading photos");} //if did not successfully receive a response
}

function UpdateSound() { //change the sound file to the one sent by the server
    if (this.status == 200) {
        var audio_file_name = this.responseText; 
        //next if/else adapted from here:
        //https://stackoverflow.com/questions/20071328/how-to-stop-and-play-multiple-sounds-in-html5-without-overlapping-them
        if (audio === null) {  
            audio = new Audio(audio_file_name);  
            audio.loop = true;
            audio.play();        
        }  
        else {
            audio.pause();  
            audio.src = audio_file_name;  
            audio.play();  
        }
    }
    else {alert("Error loading sounds");} //if did not successfully receive a response
}

export function CheckLocation(currNode) { //figure out if the location has changed
    if (location != currNode["location"]) { //if the location stored doesn't equal the new location
        location = currNode["location"]; //set the stored location to equal the new one
        utils.SendXML({"request": "UpdateBackground", "location": location}, UpdateBackground); //send a request for files and then update the background
        utils.SendXML({"request": "UpdateSound", "location": location}, UpdateSound); //send a request for files and then update the sound
    }
}