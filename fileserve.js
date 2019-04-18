//module.js handles requests for static files
var fs = require('fs');
var path = require('path');

//returns the content type of a given file extension if known, else returns false
function GetContentType(ext) {
    switch(ext) {
        case ".js":
            return "text/javascript";
        case ".html":
            return "text/html";
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".css":
            return "text/css";
        case ".png":
            return "image/png";
        case ".txt":
            return "text/plain";
        case ".csv":
            return "text/csv";
        default:
            return false;
    }
}

//adds the correct directory prefixes to the filepath in order to find files within the hierarchy
function ModifyFilepath (filepath, ext) {
    switch(ext) {
        case ".js":
            filepath = "js/" + filepath;
            break;
        case ".html":
            filepath = "html/" + filepath;
            break;
        case ".jpg":
        case ".jpeg":
        case ".png":
            filepath = "images/" + filepath;
            break;
        case ".css":
            filepath = "css/" + filepath;
            break;
        case ".txt":
            filepath = "txt/" + filepath;
            break;
        case ".csv":
            filepath = "csv/" + filepath;
            break;
        default:
            return filepath;
    }
    filepath = "public-html/" + filepath;
    return filepath;
}

//takes a relative filepath, finds content type and makes sure filepath is correct, then writes content
exports.ServeFile = (filepath, res) => {
    //get content type
    var contentType = GetContentType(path.extname(filepath));
    //modify filepath to match directory structure
    filepath = ModifyFilepath(filepath, path.extname(filepath));
    //if content type isn't recognized, return error
    if (!contentType) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error: Unidentified file type.');
        res.end();
    //else file type was recognized, attempt to read and serve file
    } else {
        fs.readFile(filepath, function(err, data) {
            //if file can't be read, serve error
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Error: Unable to read file.');
                res.end();
            //else serve file
            } else {
                res.writeHead(200, {'Content-Type': contentType });
                res.write(data);
                res.end();
            }
        })
    }
}