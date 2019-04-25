var utils = require("./server-utils.js");
var fs = require("fs");
var path = require('path');
//var sampleNode = {"id": 1, "parent": 0, "type": "user", "text": "I spin around in a circle.", "location": "field"};
var txtDB = "/publichtml/txt/fake-db.txt";

exports.test = () => { //i had to put something here so the compiler doesn't yell at me, this is not an actual function
    return true;
}

exports.updateBackground = function(res, location) { // location is the location of the story. eg. 'field'
    var file_name = location + ".jpeg";
    console.log(file_name);
    serve_static_file(file_name, res);
}

exports.updateSound = function(res, location) {
    var path = location;
    
}

function serve_static_file(file, res) {
    var rs = fs.createReadStream(file);
    var ct = content_type_for_path(file);
    console.log(ct);
    res.writeHead(200, { "Content-Type" : ct });
    rs.on('error', (e) => {
        res.writeHead(404, { "Content-Type" : "application/json" });
        var out = { error: "not_found",
                    message: "'" + file + "' not found" };
        res.end(JSON.stringify(out) + "\n");
        console.log("error");
        return;
    });
    rs.on('readable', () => {
        var d = rs.read();
        if (d) {
            res.write(d);
        }
        console.log("reading");
    });
    rs.on('end', () => {
        console.log("end")
        res.end();  // we're done!!!
    });
}


function content_type_for_path (file) {
    var ext = path.extname(file);
    switch (ext.toLowerCase()) {
        case '.html': return "text/html";
        case ".js": return "text/javascript";
        case ".css": return 'text/css';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}
