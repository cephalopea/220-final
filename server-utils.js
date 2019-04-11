//parses query portion of url
exports.StringToQuery = (query) => {
    //split url query at ampersands to separate out key/val pairs
    query = query.split("&");
    //create empty dict to store key/values
    var queryObj = {};
    //for each split piece of url query (aka gary)
    query.forEach(gary => {
        //split gary into a key (0) and a value (1)
        garry = gary.split("=");
        //add the key and value into queryObj
        queryObj[garry[0]] = garry[1];
    })
    //once everything is parsed, return queryObj
    return queryObj;
}

exports.sendJSONObj = (res, status, data) => {
    res.writeHead(status, {"Content-Type": "application/json"});
    res.write(JSON.stringify(data));
    res.end();
}