import * as utils from "./client-utils.js";

function checkPassword() { //checks the password
    if (passField.value == "dundermifflin") { //if the password is correct
        formDiv.innerHTML = ""; //remove the password field
        utils.SendXML({request: "GetNextNodes", text: "ALL"}, addNodeInfo); //get all the nodes, then add to page
    } else {
        textDiv.innerHTML = "<p>Password incorrect, please try again.</p>"; //display incorrect password message
    }
    return true;
}