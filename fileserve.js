//module.js handles requests for static files
var fs = require('fs');
var path = require('path');

function GetContentType(ext) { //returns the content type of a given file extension if known, else returns false
    switch(ext) { //switch case looks at file extension
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
        case ".mp3":
            return "audio/mp3";
        default:
            return false;
    }
}

function ModifyFilepath (filepath, ext) { //adds the correct directory prefixes to the filepath in order to find files within the hierarchy
    switch(ext) { //switch case looks at file extension
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
        case ".mp3":
            filepath = "sounds/" + filepath;
            break;
        default:
            return filepath;
    }
    filepath = "public-html/" + filepath;
    return filepath;
}

exports.ServeFile = (filepath, res) => { //takes a relative filepath, finds content type and makes sure filepath is correct, then writes content
    var contentType = GetContentType(path.extname(filepath)); //get content type
    filepath = ModifyFilepath(filepath, path.extname(filepath)); //modify filepath to match directory structure
    if (!contentType) { //if content type isn't recognized, return error
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error: Unidentified file type.');
        res.end();
    } else { //else file type was recognized, attempt to read and serve file
        fs.readFile(filepath, function(err, data) {
            if (err) { //if file can't be read, serve error
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Error: Unable to read file.');
                res.end();
            } else { //else serve file
                res.writeHead(200, {'Content-Type': contentType });
                res.write(data);
                res.end();
            }
        })
    }
}