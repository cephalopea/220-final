function SelectOption() {
    this.classList.remove("user");
    this.classList.add("history");
    this.style.textDecoration = "none";
    this.removeEventListener("click", SelectOption);
    this.removeEventListener("mouseover", AddUnderline);
    this.removeEventListener("mouseout", RemoveUnderline);
    var unchosenElems = document.getElementsByClassName("user");
    console.log(unchosenElems[0].innerHTML);
    console.log(unchosenElems[1].innerHTML);
    for (let elem of unchosenElems) {
        console.log(elem);
        elem.parentNode.removeChild(elem);
    }
    
}

function AddUnderline() {
    this.style.textDecoration = "underline";
}

function RemoveUnderline() {
    this.style.textDecoration = "none";
}

var userElems = document.getElementsByClassName("user");
for (let elem of userElems) {
    elem.addEventListener("click", SelectOption);
    elem.addEventListener("mouseover", AddUnderline);
    elem.addEventListener("mouseout", RemoveUnderline);
}