function QueryToString(obj) {
    //create str to return
    var queryString = "";
    //get keys from obj
    var keyz = Object.keys(obj);
    //loop through keys and add key/val pairs to string
    for (key of keyz) {
        queryString += key + "=" + obj[key] + "&";
    }
    //remove unnecessary ampersand from end and return
    return queryString.slice(0,-1);
}

function SendXML(request, callback) {
    //create new ajax
    var xmlhttp = new XMLHttpRequest();
    //load album names when ajax request is received
    xmlhttp.onload = callback;
    //if there's an error, alert
    xmlhttp.onerror = function() {alert("Error with XML");};
    //request to list albums through url
    request = QueryToString(request);
    //add request to url query string
    xmlhttp.open("GET", ("http://localhost:8080/?" + request));
    //send ajax
    xmlhttp.send();
}
