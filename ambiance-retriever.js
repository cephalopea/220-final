var utils = require("./server-utils.js");
var fs = require("fs");
var path = require('path');
//var sampleNode = {"id": 1, "parent": 0, "type": "user", "text": "I spin around in a circle.", "location": "field"};
var txtDB = "/publichtml/txt/fake-db.txt";

exports.test = () => { //i had to put something here so the compiler doesn't yell at me, this is not an actual function
    return true;
}

exports.updateBackground = function(location) {
    var path = location;
}

exports.updateSound = function(location) {
    
}



function serve_static_file(file, res) {
    var rs = fs.createReadStream(file);
    var ct = content_type_for_path(file);
    res.writeHead(200, { "Content-Type" : ct });
    rs.on('error', (e) => {
        res.writeHead(404, { "Content-Type" : "application/json" });
        var out = { error: "not_found",
                    message: "'" + file + "' not found" };
        res.end(JSON.stringify(out) + "\n");
        return;
    });
    rs.on('readable', () => {
        var d = rs.read();
        if (d) {
            res.write(d);
        }
    });
    rs.on('end', () => {
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
