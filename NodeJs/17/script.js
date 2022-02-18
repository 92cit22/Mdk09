var k = 8;
var leftOffset = koef(3);
var topOffset = koef(40);
var elemOffset = koef(5);
var ctx;
var windowWidth = koef(4);
var height1 = koef(6);
var hor = koef(7);
var vert = koef(5);
var domWidth = koef(14);
var domHeight = koef(20);
var wallWinWidth = koef(6);
var wallWinHeight = koef(10);
var towerWidth = koef(14);
var towerHeight = koef(45);
var flagWidth = koef(10);
window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    Draw();
};
function Draw() {
    ctx.lineWidth = koef(3);
    ctx.lineCap = "butt";
    var beginTower1 = new Point(leftOffset, topOffset);
    var endTower1 = DrawTower(beginTower1);
    var beginWall = new Point(endTower1.X, beginTower1.Y);
    var endWall = DrawWall(beginWall, endTower1.Y);
    var beginDom = new Point(center(endTower1.X, endWall.X), topOffset / 3 - 5);
    DrawDominius(beginDom);
    DrawTower(new Point(endWall.X, topOffset));
}
function DrawTower(begin) {
    ctx.rect(begin.X, begin.Y, towerWidth, towerHeight);
    ctx.rect(begin.X + elemOffset, begin.Y + elemOffset, windowWidth, height1);
    ctx.rect(begin.X + elemOffset, begin.Y + elemOffset * 2 + height1, windowWidth, height1);
    ctx.stroke();
    return new Point(begin.X + towerWidth, begin.Y + towerHeight);
}
function DrawWall(begin, endY) {
    var beginWave = new Point(begin.X, begin.Y + (endY - begin.Y) / 6);
    var endWave = createWave(beginWave, 4);
    var beginFloor = new Point(begin.X, endY);
    var endFloor = DrawFloor(beginFloor, endWave.X);
    var botCenterDoor = new Point(center(begin.X, endFloor.X), endFloor.Y);
    var topDoor = center(begin.Y, endFloor.Y);
    createDoor(botCenterDoor, topDoor);
    createWindows(begin, endWave);
    return endFloor;
}
function createWave(begin, i) {
    ctx.beginPath();
    begin.Y += vert;
    ctx.moveTo(begin.X, begin.Y);
    for (var index = 0; index < i; index++) {
        begin.X += hor;
        ctx.lineTo(begin.X, begin.Y);
        ctx.lineTo(begin.X, begin.Y - vert);
        begin.X += hor;
        ctx.lineTo(begin.X, begin.Y - vert);
        ctx.lineTo(begin.X, begin.Y);
    }
    begin.X += hor;
    ctx.lineTo(begin.X, begin.Y);
    ctx.stroke();
    return new Point(begin.X, begin.Y);
}
function DrawFloor(begin, endX) {
    ctx.beginPath();
    ctx.moveTo(begin.X, begin.Y);
    ctx.lineTo(endX, begin.Y);
    ctx.stroke();
    return new Point(endX, begin.Y);
}
function createDoor(botCenter, top, width) {
    if (width === void 0) { width = botCenter.Y - top; }
    var topCenter = new Point(botCenter.X, top);
    createHalf(topCenter, new Point(topCenter.X + width / 2, botCenter.Y));
    createHalf(topCenter, new Point(topCenter.X - width / 2, botCenter.Y));
    return new Point(botCenter.X + width / 2, botCenter.Y);
}
function createHalf(begin, end) {
    ctx.beginPath();
    ctx.moveTo(begin.X, begin.Y);
    ctx.lineTo(begin.X, end.Y);
    ctx.lineTo(end.X, end.Y);
    ctx.lineTo(end.X, center(begin.Y, end.Y));
    ctx.quadraticCurveTo(end.X, begin.Y, begin.X, begin.Y);
    ctx.stroke();
}
function createWindows(begin, endWave) {
    ctx.beginPath();
    ctx.rect(begin.X + elemOffset, endWave.Y + elemOffset, wallWinWidth, wallWinHeight);
    ctx.rect(endWave.X - elemOffset - wallWinWidth, endWave.Y + elemOffset, wallWinWidth, wallWinHeight);
    ctx.stroke();
}
function DrawDominius(begin) {
    var endFlag = DrawFlag(begin);
    ctx.moveTo(endFlag.X - domWidth / 2, endFlag.Y + domHeight);
    ctx.lineTo(endFlag.X - domWidth / 2, endFlag.Y);
    ctx.lineTo(endFlag.X + domWidth / 2, endFlag.Y);
    ctx.lineTo(endFlag.X + domWidth / 2, endFlag.Y + domHeight);
    ctx.stroke();
    return new Point(endFlag.X + domWidth / 2, endFlag.Y + domHeight);
}
function DrawFlag(begin) {
    ctx.beginPath();
    ctx.rect(begin.X, begin.Y + elemOffset, flagWidth, height1);
    ctx.moveTo(begin.X, begin.Y);
    ctx.lineTo(begin.X, begin.Y + elemOffset * 2 + height1);
    ctx.stroke();
    return new Point(begin.X, begin.Y + elemOffset * 2 + height1);
}
function center(begin, end) {
    return begin + (end - begin) / 2;
}
function koef(digit) {
    return digit * k;
}
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    return Point;
}());
