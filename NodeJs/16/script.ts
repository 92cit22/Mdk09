class DayNight {
    sky = $("");
    object = $("");
    timer = new Timer(100, 6);
    currentAngle = 0.0;
    startAngle = 0.0;
    currentX = 0;
    currentY = 0;

    radiusX = () => this.baseX() * 0.8;
    radiusY = () => this.baseY() * 0.8;
    height = () => this.sky.height();
    width = () => this.sky.width();
    baseY = () => this.height() / 2;
    baseX = () => this.width() / 2;

    constructor(object, startAngle, sky) {
        this.object = object;
        this.currentAngle = this.startAngle = startAngle;
        this.sky = sky;
    }

    next() {
        this.changePosition()
        // this.validateView();
    }

    changePosition() {
        this.currentX = Math.cos(this.currentAngle) * this.radiusX() - this.object.height() / 2;
        this.currentY = Math.sin(this.currentAngle) * this.radiusY() - this.object.width() / 2;
        this.setPosition(this.baseX() + this.currentX, this.baseY() + this.currentY);
        this.currentAngle += Math.PI / (12 * 60);
        if (this.currentAngle >= this.startAngle + 2 * Math.PI)
            this.currentAngle = this.startAngle;
    }

    reset() {
        this.currentAngle = this.startAngle;
        this.next();
    }

    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }

    setX(x) {
        this.object.css({ left: x });
    }

    setY(y) {
        this.object.css({ top: y });
    }
}

function timeRender() {
    let time = this.updateTime == 0 ? 1 : this.updateTime;
    $("#scale").html((1000 / time).toLocaleString('ru-ru', { maximumFractionDigits: 2 }));
    $("#min").html(this.hours.toLocaleString('ru-ru', { minimumIntegerDigits: 2 }));
    $("#sec").html(this.minutes.toLocaleString('ru-ru', { minimumIntegerDigits: 2 }));
    if (this.hours >= 18)
        $("#sky").addClass("night")
    else if (this.hours >= 6)
        $("#sky").removeClass("night")
}

var timer = new Timer(100, 6);
timer.render = timeRender;
timer.render()
var sunObj;
var moonObj;
$(document).ready(() => {
    sunObj = new DayNight($("#sun"), Math.PI, $("#sky"));
    moonObj = new DayNight($("#moon"), 0, $("#sky"));
    timer.AddObserver(sunObj)
        .AddObserver(moonObj)
        .next();

    $(document).on("keydown", (event) => {
        console.log(event.key);

        switch (event.key) {
            case " ":
                timer.toggle();
                break;
            case "ArrowLeft":
                timer.speedDown();
                break;
            case "ArrowRight":
                timer.speedUp();
                break;
            case "Escape":
                timer.stop();
                break;
            default:
                break;
        }
    })
    $("#start").click((event) => timer.start());
    $("#pause").click((event) => timer.pause());
    $("#stop").click((event) => timer.stop());
});
