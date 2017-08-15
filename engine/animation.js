function Animation(frames) {
    this.time = 0;
    this.count = 0;
    this.frames = frames;
}

Animation.prototype.update = function(deltatime) {
    this.time += deltatime;
    if (this.time >= ((60 / this.frames) / 60)) {
        this.count++;
        this.count %= this.frames;
        this.time = 0;
    }
};

Animation.prototype.getFrame = function() {
    return this.count;
};