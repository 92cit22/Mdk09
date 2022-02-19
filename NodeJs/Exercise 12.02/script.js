// import {} from "./scripts/timer";
var timer = new Timer();
window.onload = function () {
    document.body.style.overflow = "hidden";
    Load1stPage();
};
//#region first page
function Load1stPage() {
    document.body.innerHTML = "";
    document.body.appendChild(createContainer());
    $.getJSON("./media/maps.json").done(function (data) {
        $.each(data, function (key, imagePath) {
            appendImg(imagePath);
        });
    });
    appendForm();
}
function createContainer() {
    var container = document.createElement("div");
    container.id = "container";
    container.classList.add("body-flex");
    return container;
}
function appendImg(data) {
    console.log(data);
    var div = document.createElement("div");
    div.id = data;
    div.onclick = function () { return selectLevel(data); };
    var img = document.createElement("img");
    img.src = "./media/".concat(data);
    img.alt = data;
    img.width = 200;
    img.height = 150;
    div.appendChild(img);
    var p = document.createElement("p");
    p.append(data);
    div.appendChild(p);
    document.getElementById("container").appendChild(div);
}
function appendForm() {
    var form = document.createElement("form");
    form.style.opacity = "0";
    form.id = "form";
    form.onsubmit = function () { return submitForm(form); };
    var hInput = document.createElement("input");
    hInput.type = "hidden";
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Your Nickname: ";
    input.classList.add("text");
    var btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Send!";
    form.appendChild(hInput);
    form.appendChild(input);
    form.appendChild(btn);
    document.body.appendChild(form);
}
function selectLevel(mapId) {
    var form = document.getElementById("form");
    form.style.opacity = "1";
    form.firstElementChild.value = mapId;
}
function submitForm(form) {
    var input = form.getElementsByClassName("text")[0];
    var nickName = input.value;
    var mapId = form.firstElementChild.value;
    if (nickName == "") {
        return selectLevel(mapId);
    }
    if (nickName == null)
        return;
    localStorage["NickName"] = nickName;
    localStorage["Map"] = mapId;
    Load2ndPage();
}
//#endregion
//#region 2nd page
function Load2ndPage() {
    document.body.innerHTML = "";
    var container = createContainer();
    container.classList.add("second");
    document.body.appendChild(container);
    LoadUserInfo();
    var canvas = LoadMap();
}
function LoadUserInfo() {
    AppendNick();
    AppendNowDate();
    AppendTimer();
    AppendLife();
}
function AppendNick() {
    var name = document.createElement("p");
    name.append("Nickname: ".concat(localStorage["NickName"]));
    document.getElementById("container").appendChild(name);
}
function AppendNowDate() {
    var date = new Date();
    var hours = document.createElement("span");
    hours.append(date.getHours().toLocaleString('ru-ru', { minimumIntegerDigits: 2 }));
    var sep1 = document.createElement("span");
    sep1.append(":");
    var minutes = document.createElement("span");
    minutes.append(date.getMinutes().toLocaleString('ru-ru', { minimumIntegerDigits: 2 }));
    var sep2 = document.createElement("span");
    sep2.append(":");
    var seconds = document.createElement("span");
    seconds.append(date.getSeconds().toLocaleString('ru-ru', { minimumIntegerDigits: 2 }));
    var time = document.createElement("p");
    time.append("Now: ", hours, sep1, minutes, sep2, seconds);
    document.getElementById("container").appendChild(time);
    setInterval(function () {
        date = new Date();
        hours.innerHTML = date.getHours().toLocaleString('ru-ru', { minimumIntegerDigits: 2 });
        minutes.innerHTML = date.getMinutes().toLocaleString('ru-ru', { minimumIntegerDigits: 2 });
        seconds.innerHTML = date.getSeconds().toLocaleString('ru-ru', { minimumIntegerDigits: 2 });
    }, 1000);
}
function AppendTimer() {
    timer.start();
    var minutes = document.createElement("span");
    minutes.append(timer.minutes.toLocaleString('ru-ru', { minimumIntegerDigits: 2 }));
    var sep2 = document.createElement("span");
    sep2.append(":");
    var seconds = document.createElement("span");
    seconds.append(timer.seconds.toLocaleString('ru-ru', { minimumIntegerDigits: 2 }));
    var time = document.createElement("p");
    time.append("Your time: ", minutes, sep2, seconds);
    document.getElementById("container").appendChild(time);
    setInterval(function () {
        minutes.innerHTML = timer.minutes.toLocaleString('ru-ru', { minimumIntegerDigits: 2 });
        seconds.innerHTML = timer.seconds.toLocaleString('ru-ru', { minimumIntegerDigits: 2 });
    }, 1000);
}
function AppendLife() {
    var name = document.createElement("p");
    localStorage["Lives"] = 5;
    name.append("Your lives: ".concat(localStorage["Lives"]));
    document.getElementById("container").appendChild(name);
    timer.observers.push({ next: function () {
            name.innerText = "Your lives: ".concat(localStorage["Lives"]);
        } });
}
function LoadMap() {
    var canvas = document.createElement("canvas");
    canvas.style.border = "1px solid";
    canvas.style.backgroundImage = "url('./media/".concat(localStorage["Map"], "')");
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.zIndex = "-2";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    document.body.classList.remove("body-flex");
    return canvas;
}
//#endregion
