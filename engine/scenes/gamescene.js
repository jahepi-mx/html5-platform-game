function GameScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.controller = new Controller();
    this.render = new Render(this.context, this.canvas, this.controller);
    
    var controller = this.controller;
    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode === 38) controller.jump();
        if (e.keyCode === 37) controller.moveLeft(true);
        if (e.keyCode === 39) controller.moveRight(true);
        if (e.keyCode === 32) controller.shoot();
    };

    document.onkeyup = function(e) {
        e = e || window.event;
        if (e.keyCode === 37) controller.moveLeft(false);
        if (e.keyCode === 39) controller.moveRight(false);
    };
}

GameScene.prototype.update = function(deltatime) {
    this.render.update(deltatime);
};
