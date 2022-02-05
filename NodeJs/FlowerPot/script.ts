window.onload = ()=>{
    var canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    DrawCactusesInPot(ctx);
}
function DrawCactusesInPot(ctx: CanvasRenderingContext2D) {
    //cactuses
    ctx.fillStyle = "green";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    //left cactus
    ctx.beginPath();
    ctx.ellipse(100, 150, 65, 100, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    //right cactus
    ctx.beginPath();
    ctx.ellipse(150, 200, 60, 90, 30/Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    //flowerpot
    ctx.fillStyle = "pink";
    //pot
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(25, 160);
    ctx.lineTo(40, 300);
    ctx.lineTo(215, 300);
    ctx.lineTo(230, 160);
    ctx.stroke();
    ctx.fill();

    //pot's top
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.fillRect(20, 150, 215, 20);
    ctx.strokeRect(20, 150, 215, 20);
}