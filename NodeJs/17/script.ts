const k = 8;
const leftOffset = koef(3);
const topOffset = koef(40);
const elemOffset = koef(5)
var ctx: CanvasRenderingContext2D;

let windowWidth = koef(4)
let height1 = koef(6)

let hor = koef(7)
let vert = koef(5)

let domWidth = koef(14)
let domHeight = koef(20)

let wallWinWidth = koef(6)
let wallWinHeight = koef(10)

const towerWidth = koef(14);
const towerHeight = koef(45);

let flagWidth = koef(10)

window.onload = function () {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx = canvas.getContext("2d")
    Draw()
};

function Draw() {
    ctx.lineWidth = koef(3)
    ctx.lineCap = "butt"

    let beginTower1 = new Point(leftOffset, topOffset)
    let endTower1 = DrawTower(beginTower1)

    let beginWall = new Point(endTower1.X, beginTower1.Y)
    let endWall = DrawWall(beginWall, endTower1.Y)

    let beginDom = new Point(center(endTower1.X, endWall.X), topOffset / 3 - 5)
    DrawDominius(beginDom)

    DrawTower(new Point(endWall.X, topOffset))
}

function DrawTower(begin: Point) {

    ctx.rect(begin.X, begin.Y, towerWidth, towerHeight)
    ctx.rect(begin.X + elemOffset, begin.Y + elemOffset, windowWidth, height1)
    ctx.rect(begin.X + elemOffset, begin.Y + elemOffset * 2 + height1, windowWidth, height1)

    ctx.stroke()
    return new Point(begin.X + towerWidth, begin.Y + towerHeight)
}

function DrawWall(begin: Point, endY: number) {

    let beginWave = new Point(begin.X, begin.Y + (endY - begin.Y) / 6)
    let endWave = createWave(beginWave, 4)

    let beginFloor = new Point(begin.X, endY)
    let endFloor = DrawFloor(beginFloor, endWave.X)

    let botCenterDoor = new Point(center(begin.X, endFloor.X), endFloor.Y)
    let topDoor = center(begin.Y, endFloor.Y)
    createDoor(botCenterDoor, topDoor)
    createWindows(begin, endWave)

    return endFloor
}

function createWave(begin: Point, i: number) {
    ctx.beginPath();

    begin.Y += vert
    ctx.moveTo(begin.X, begin.Y)

    for (let index = 0; index < i; index++) {
        begin.X += hor
        ctx.lineTo(begin.X, begin.Y)
        ctx.lineTo(begin.X, begin.Y - vert)
        begin.X += hor
        ctx.lineTo(begin.X, begin.Y - vert)
        ctx.lineTo(begin.X, begin.Y)
    }

    begin.X += hor
    ctx.lineTo(begin.X, begin.Y)

    ctx.stroke()

    return new Point(begin.X, begin.Y)
}

function DrawFloor(begin: Point, endX: number) {
    ctx.beginPath()
    ctx.moveTo(begin.X, begin.Y)
    ctx.lineTo(endX, begin.Y)
    ctx.stroke()

    return new Point(endX, begin.Y)
}

function createDoor(botCenter: Point, top: number, width: number = botCenter.Y - top) {

    let topCenter = new Point(botCenter.X, top)

    createHalf(topCenter, new Point(topCenter.X + width / 2, botCenter.Y));
    createHalf(topCenter, new Point(topCenter.X - width / 2, botCenter.Y))

    return new Point(botCenter.X + width / 2, botCenter.Y)
}

function createHalf(begin: Point, end: Point) {
    ctx.beginPath()
    ctx.moveTo(begin.X, begin.Y)
    ctx.lineTo(begin.X, end.Y)
    ctx.lineTo(end.X, end.Y)
    ctx.lineTo(end.X, center(begin.Y, end.Y))
    ctx.quadraticCurveTo(end.X, begin.Y, begin.X, begin.Y)
    ctx.stroke()
}

function createWindows(begin: Point, endWave: Point) {
    ctx.beginPath()
    ctx.rect(begin.X + elemOffset, endWave.Y + elemOffset, wallWinWidth, wallWinHeight)
    ctx.rect(endWave.X - elemOffset - wallWinWidth, endWave.Y + elemOffset, wallWinWidth, wallWinHeight)
    ctx.stroke()
}

function DrawDominius(begin: Point) {

    let endFlag = DrawFlag(begin)

    ctx.moveTo(endFlag.X - domWidth / 2, endFlag.Y + domHeight)
    ctx.lineTo(endFlag.X - domWidth / 2, endFlag.Y)
    ctx.lineTo(endFlag.X + domWidth / 2, endFlag.Y)
    ctx.lineTo(endFlag.X + domWidth / 2, endFlag.Y + domHeight)
    ctx.stroke()

    return new Point(endFlag.X + domWidth / 2, endFlag.Y + domHeight)

}

function DrawFlag(begin: Point) {
    ctx.beginPath()

    ctx.rect(begin.X, begin.Y + elemOffset, flagWidth, height1)
    ctx.moveTo(begin.X, begin.Y);
    ctx.lineTo(begin.X, begin.Y + elemOffset * 2 + height1)

    ctx.stroke()
    return new Point(begin.X, begin.Y + elemOffset * 2 + height1)
}

function center(begin: number, end: number) {
    return begin + (end - begin) / 2
}

function koef(digit: number) {
    return digit * k;
}

class Point {
    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    public X: number;
    public Y: number;
}