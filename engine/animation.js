function Animation(frames, numberOfSequencesPerSec) {
    this.time = 0;
    this.count = 0;
    this.frames = frames;
    this.numberOfSequencesPerSec = numberOfSequencesPerSec;
    this.sequences = 0;
}

Animation.prototype.update = function(deltatime) {
    var fps = 1 / deltatime;
    var ratio = fps / this.numberOfSequencesPerSec;
    this.time += deltatime;
    if (this.time >= ((ratio / this.frames) / fps)) {
        this.count++;
        this.count %= this.frames;
        if (this.count === 0) {
            this.sequences++;
        }
        this.time = 0;
    }
};

Animation.prototype.getFrame = function() {
    return this.count;
};

Animation.prototype.getNumberOfSequences = function() {
    return this.sequences;
};