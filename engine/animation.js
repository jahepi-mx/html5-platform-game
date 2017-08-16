function Animation(frames) {
    this.time = 0;
    this.count = 0;
    this.frames = frames;
}

Animation.prototype.update = function(deltatime) {
    var fps = 1 / deltatime;
    this.time += deltatime;
    if (this.time >= ((fps / this.frames) / fps)) {
        this.count++;
        this.count %= this.frames;
        this.time = 0;
    }
};

Animation.prototype.getFrame = function() {
    return this.count;
};