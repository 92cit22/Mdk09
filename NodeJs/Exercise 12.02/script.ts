// import {} from "./scripts/timer";
let timer = new Timer();
window.onload = () => {
    document.body.style.overflow = "hidden"
    Load1stPage();
}

//#region first page

function Load1stPage() {
    document.body.innerHTML = "";
    document.body.appendChild(createContainer());

    $.getJSON("./media/maps.json").done((data) => {
        $.each(data, (key, imagePath) => {
            appendImg(imagePath);
        })
    });
    appendForm()
}

function createContainer() {
    let container = document.createElement("div");
    container.id = "container";
    container.classList.add("body-flex")
    return container;    
}

function appendImg(data: string) {
    console.log(data);
    let div = document.createElement("div");
    div.id = data;
    div.onclick = () => selectLevel(data)

    let img = document.createElement("img");
    img.src = `./media/${data}`;
    img.alt = data;
    img.width = 200;
    img.height = 150;
    div.appendChild(img);

    let p = document.createElement("p");
    p.append(data);
    div.appendChild(p);

    document.getElementById("container").appendChild(div);
}

function appendForm() {
    let form = document.createElement("form");
    form.style.opacity = "0";
    form.id = "form";
    form.onsubmit = () => submitForm(form);

    let hInput = document.createElement("input");
    hInput.type = "hidden";

    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Your Nickname: ";
    input.classList.add("text");

    let btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Send!";
    form.appendChild(hInput);
    form.appendChild(input);
    form.appendChild(btn);
    document.body.appendChild(form);
}

function selectLevel(mapId: string) {
    let form = document.getElementById("form");
    form.style.opacity = "1";
    (form.firstElementChild as HTMLInputElement).value = mapId;
}

function submitForm(form) {
    let input = form.getElementsByClassName("text")[0] as HTMLInputElement;
    let nickName = input.value;
    let mapId = (form.firstElementChild as HTMLInputElement).value;

    if (nickName == "") {
        return selectLevel(mapId)
    }
    if (nickName == null)
        return;
    localStorage["NickName"] = nickName;
    localStorage["Map"] = mapId;
    Load2ndPage()
}

//#endregion

//#region 2nd page

function Load2ndPage() {
    document.body.innerHTML = "";
    let container = createContainer();
    container.classList.add("second")
    document.body.appendChild(container);
    
    LoadUserInfo();

    let canvas = LoadMap()

}


function LoadUserInfo() {
    AppendNick()

    AppendNowDate()

    AppendTimer()

    AppendLife()
}

function AppendNick() {
    let name = document.createElement("p");
    name.append(`Nickname: ${localStorage["NickName"]}`);
    document.getElementById("container").appendChild(name);
}

function AppendNowDate() {
    let date = new Date();
    let hours = document.createElement("span")
    hours.append(date.getHours().toLocaleString('ru-ru', {minimumIntegerDigits: 2}))

    let sep1 = document.createElement("span")
    sep1.append(":")

    let minutes = document.createElement("span")
    minutes.append(date.getMinutes().toLocaleString('ru-ru', {minimumIntegerDigits: 2}))

    let sep2 = document.createElement("span")
    sep2.append(":")

    let seconds = document.createElement("span")
    seconds.append(date.getSeconds().toLocaleString('ru-ru', {minimumIntegerDigits: 2}))

    let time = document.createElement("p");
    time.append("Now: ", hours, sep1, minutes, sep2, seconds);
    document.getElementById("container").appendChild(time);

    setInterval(() => {
        date = new Date();
        hours.innerHTML = date.getHours().toLocaleString('ru-ru', {minimumIntegerDigits: 2});
        minutes.innerHTML = date.getMinutes().toLocaleString('ru-ru', {minimumIntegerDigits: 2});
        seconds.innerHTML = date.getSeconds().toLocaleString('ru-ru', {minimumIntegerDigits: 2});
    }, 1000)
}

function AppendTimer() {
    timer.start();
    let minutes = document.createElement("span")
    minutes.append(timer.minutes.toLocaleString('ru-ru', {minimumIntegerDigits: 2}))

    let sep2 = document.createElement("span")
    sep2.append(":")

    let seconds = document.createElement("span")
    seconds.append(timer.seconds.toLocaleString('ru-ru', {minimumIntegerDigits: 2}))

    let time = document.createElement("p");
    time.append("Your time: ", minutes, sep2, seconds);
    document.getElementById("container").appendChild(time);

    setInterval(() => {
        minutes.innerHTML = timer.minutes.toLocaleString('ru-ru', {minimumIntegerDigits: 2});
        seconds.innerHTML = timer.seconds.toLocaleString('ru-ru', {minimumIntegerDigits: 2});
    }, 1000)

}

function AppendLife() {
    let name = document.createElement("p");
    localStorage["Lives"] = 5;
    name.append(`Your lives: ${localStorage["Lives"]}`);
    document.getElementById("container").appendChild(name);
    timer.observers.push({next: ()=>{
            name.innerText = `Your lives: ${localStorage["Lives"]}`
        }})
}

function LoadMap() {
    let canvas = document.createElement("canvas");
    canvas.style.border = "1px solid";
    canvas.style.backgroundImage = `url('./media/${localStorage["Map"]}')`;
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.zIndex = "-2";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.body.appendChild(canvas);
    document.body.classList.remove("body-flex")
    return canvas;
}

//#endregion