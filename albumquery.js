var utils = require('./utils.js');
var fs = require('fs');

function UploadAlbumNames(res) {
    fs.readdir("publichtml/images/", (err, files) => {
        if (err) {
            utils.sendJSONObj(res, 500, err);
        } else {
            utils.sendJSONObj(res, 200, {albums: files.slice(1)});
        }
    })
}

function UploadFileNames(query, res) {
    fs.readdir(("publichtml/images/" + query.albumName), (err, files) => {
        if (err) { 
            utils.sendJSONObj(res, 500, err);
        } else {
            files.forEach(file => {
                file = (query.albumName + "/" + file);
            });
            utils.sendJSONObj(res, 200, {files: files.slice(1), albumName: query.albumName}); 
        }
    });
}

exports.ProcessQuery = (query, res) => {
    switch (query["request"]) {
        case "ListAlbums":
            UploadAlbumNames(res);
            break;
        case "ListPhotos":
            UploadFileNames(query,res);
            break;
        default:
            var errObj = {message: "Query not supported"};
            utils.sendJSONObj(res, 500, errObj);
            break;
    }
}