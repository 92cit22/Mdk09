let draggable: HTMLElement = null;

window.onload = () => {
    begin()
}

function begin() {
    let main = document.body.getElementsByTagName("main")[0];
    for (let i = 0; i < 6; i++) {
        
        let img = document.createElement("img");
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
