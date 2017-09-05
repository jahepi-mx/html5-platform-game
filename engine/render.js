function Render(context, canvas, controller) {
    this.context = context;
    this.controller = controller;
    this.canvas = canvas;
}

Render.prototype.isHeroDead = function() {
    return this.controller.isHeroDead();
};

Render.prototype.isCurrentLevelFinish = function() {
    return this.controller.isCurrentLevelFinish();
};

Render.prototype.playNextLevel = function() {
    return this.controller.initNextLevel();
};

Render.prototype.isLastLevel = function() {
    return this.controller.isLastLevel();
};

Render.prototype.update = function(deltatime) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.imageSmoothingEnabled = false;
    
    if (!this.controller.isCurrentLevelFinish()) {
        this.controller.update(deltatime);
    }
    
    this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.sky.x, Atlas.tiles.sky.y, Atlas.tiles.sky.width, Atlas.tiles.sky.height, 0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.clouds.x, Atlas.tiles.clouds.y, Atlas.tiles.clouds.width, Atlas.tiles.clouds.height, 0, 0, this.canvas.width, this.canvas.height);
    
    for (var y = this.controller.getMinY(); y <= this.controller.getMaxY(); y++) {
        for (var x = this.controller.getMinX(); x <= this.controller.getMaxX(); x++) {
            var tile = this.controller.getTile(y * this.controller.currentLevel.mapWidth + x);
            if (tile !== null) {
                tile.draw(this.context);
            }
        }
    }
    
    for (var y = this.controller.getMinY(); y <= this.controller.getMaxY(); y++) {
        for (var x = this.controller.getMinX(); x <= this.controller.getMaxX(); x++) {
            var coin = this.controller.getCoin(y * this.controller.currentLevel.mapWidth + x);
            if (coin !== null) {
                coin.draw(this.context);
            }
            var enemy = this.controller.getEnemy(y * this.controller.currentLevel.mapWidth + x);
            if (enemy !== null) {
                enemy.draw(this.context);
            }
        }
    }
    
    this.context.fillStyle = 'white';
    this.context.font = "30px joystix";
    this.context.fillText(this.controller.currentLevel.currentNumberOfCoins + "/" + this.controller.currentLevel.totalNumberOfCoins, 120, 50);
    this.context.drawImage(Assets.tilesAtlas, Atlas.tiles["coin_01"].x, Atlas.tiles["coin_01"].y, Atlas.tiles["coin_01"].width, Atlas.tiles["coin_01"].height, 10, 10, 60, 60);
    //this.context.fillStyle = 'green';
    //this.context.font = "12px joystix";
    //this.context.fillText("Fps: " + Math.floor(1 / deltatime), Config.worldWidth - 50, 15);
    this.controller.hero.draw(this.context);
};
