function LevelManager() {
    this.currentLevel = 0;
    this.levels = [new Level2(), new Level1()];
}

LevelManager.prototype.nextLevel = function() {
    this.currentLevel++;
    this.currentLevel %= this.levels.length;
};

LevelManager.prototype.getCurrentLevel = function() {
    return this.levels[this.currentLevel];
};

LevelManager.prototype.isLastLevel = function() {
    return this.currentLevel === this.levels.length - 1;
};

