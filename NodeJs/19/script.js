var draggable = null;
window.onload = function () {
    begin();
};
function begin() {
    var main = document.body.getElementsByTagName("main")[0];
    for (var i = 0; i < 6; i++) {
        var img = document.createElement("img");
        img.src = "./img/NerveFalcon.jpg";
        img.classList.add("elem");
        img.draggable = true;
        img.ondragstart = dragStart;
        main.appendChild(img);
    }
    $(".side").on("dragOver", dragOver);
}
function dragStart(event) {
    event.currentTarget.style.border = "1px solid red";
}
function dragOver(event) {
    console.log(123);
    event.preventDefault();
}
