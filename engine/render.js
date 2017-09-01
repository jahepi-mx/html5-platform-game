function Render(context, canvas, controller) {
    this.context = context;
    this.controller = controller;
    this.canvas = canvas;
    this.context.fillStyle = 'green';
    this.context.font = "12px Arial";
}

Render.prototype.isFinish = function() {
    return this.controller.isFinish();
};

Render.prototype.update = function(deltatime) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.imageSmoothingEnabled = false;
    
    this.controller.update(deltatime);
    
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
            var enemy = this.controller.getEnemy(y * this.controller.currentLevel.mapWidth + x);
            if (enemy !== null) {
                enemy.draw(this.context);
            }
        }
    }

    this.context.fillText("Fps: " + Math.floor(1 / deltatime), 25, 15);
    this.controller.hero.draw(this.context);
};
