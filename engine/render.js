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
    this.controller.update(deltatime);
    
    for (var y = this.controller.getMinY(); y <= this.controller.getMaxY(); y++) {
        for (var x = this.controller.getMinX(); x <= this.controller.getMaxX(); x++) {
            var tile = this.controller.getTile(y * Config.mapWidth + x);
            if (tile !== null) {
                tile.draw(this.context);
            }
        }
    }
    
    for (var y = this.controller.getMinY(); y <= this.controller.getMaxY(); y++) {
        for (var x = this.controller.getMinX(); x <= this.controller.getMaxX(); x++) {
            var enemy = this.controller.getEnemy(y * Config.mapWidth + x);
            if (enemy !== null) {
                enemy.draw(this.context);
            }
        }
    }

    this.context.fillText("Fps: " + parseInt(1 / deltatime), 10, 10);
    this.controller.hero.draw(this.context);
};
