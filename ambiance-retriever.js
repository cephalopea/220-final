var utils = require("./server-utils.js");
var fileserver = require("./fileserve");
var fs = require("fs");
var path = require('path');
//var sampleNode = {"id": 1, "parent": 0, "type": "user", "text": "I spin around in a circle.", "location": "field"};
var txtDB = "/publichtml/txt/fake-db.txt";

exports.test = () => { //i had to put something here so the compiler doesn't yell at me, this is not an actual function
    return true;
}

exports.updateBackground = function(res, location) { // location is the location of the story. eg. 'field'
    uploadFileNames(location, res)
}

exports.updateSound = function(res, location) {
    var path = location;
}

function uploadFileNames(location, res) {
    var file_name = location + ".jpeg"
    res.writeHead(status, {"Content-Type": "application/json"}); //write the head with status and content type
    res.write(file_name); //write the stringified json obj
    res.end(); //end
}