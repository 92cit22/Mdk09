class Timer {
    seconds;
    minutes;
    hours;
    updateTime = 0;
    interval = 0;
    isRun = false;
    observers = [];
    startSeconds;
    startHours;
    startMinutes;
    constructor(updateTime = 1000, startHours = 0, startMinutes = 0, startSeconds = 0) {
        this.updateTime = updateTime;
        this.interval = setInterval(this.next, updateTime);
        this.hours = this.startHours = startHours;
        this.minutes = this.startMinutes = startMinutes;
        this.seconds = this.startSeconds = startSeconds;
        this.reset();
        this.render();
    }

    AddObserver(observer) {
        this.observers.push(observer);
        observer.timer = this;
        return this;
    }

    next = () => {
        if (!this.isRun)
            return;
        this.seconds++;
        this.validate();
        this.render();
        this.observers.forEach(element => {
            element.next();
        });
    }

    validate() {
        if (this.seconds < 60)
            return;

        this.minutes++;
        this.seconds = 0;
        if (this.minutes < 60)
            return;

        this.hours++;
        this.minutes = 0;
        if (this.hours >= 24)
            this.hours = 0;
    }

    render = () => { };

    start() {
        this.isRun = true;
    }

    pause() {
        this.isRun = false;
    }

    toggle() {
        this.isRun = !this.isRun;
    }

    stop() {
        this.isRun = false;
        this.reset();
    }

    async speedUp() {
        if (this.updateTime > 10){
            
        this.updateTime -= 10;
        this.updateInterval();
        }
    }

    async speedDown() {
        this.updateTime += 10;
        this.updateInterval();
    }

    updateInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(this.next, this.updateTime);
        this.observers.forEach(element => {
            element.validateView();
        });
    }

    reset() {
        this.hours = this.startHours;
        this.minutes = this.startMinutes;
        this.render();
        this.observers.forEach(element => {
            element.reset();
        });
    }
}
