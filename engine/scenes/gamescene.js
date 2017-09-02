function GameScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.callback = callback;
    this.controller = new Controller();
    this.render = new Render(this.context, this.canvas, this.controller);
    this.onKeyDownRef = this.onKeyDown.bind(this);
    this.onKeyUpRef = this.onKeyUp.bind(this);
    document.onkeydown = this.onKeyDownRef;
    document.onkeyup = this.onKeyUpRef;
    this.isClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.onMouseMoveRef = this.onMouseMove.bind(this);
    this.onMouseClickRef = this.onMouseClick.bind(this);
    this.canvas.addEventListener("mousemove", this.onMouseMoveRef);
    this.canvas.addEventListener("click", this.onMouseClickRef);
}

GameScene.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
};

GameScene.prototype.onMouseClick = function(event) {
    this.isClicked = true;
};

GameScene.prototype.onKeyDown = function(e) {
    e = e || window.event;
    if (e.keyCode === 32) this.controller.jump();
    if (e.keyCode === 37) this.controller.moveLeft(true);
    if (e.keyCode === 39) this.controller.moveRight(true);
    if (e.keyCode === 38) this.controller.moveUp(true);
    if (e.keyCode === 40) this.controller.moveDown(true);
    if (e.keyCode === 65) this.controller.shoot();
};

GameScene.prototype.onKeyUp = function(e) {
    e = e || window.event;
    if (e.keyCode === 37) this.controller.moveLeft(false);
    if (e.keyCode === 39) this.controller.moveRight(false);
    if (e.keyCode === 38) this.controller.moveUp(false);
    if (e.keyCode === 40) this.controller.moveDown(false);
};

GameScene.prototype.update = function(deltatime) {
    
    this.render.update(deltatime);
    
    if (this.render.isHeroDead()) {
        
        var width = 252;
        var height = 100;
        var x = Config.worldWidth / 2 - (width / 2);
        var y = Config.worldHeight / 2 - (height * 2);
    
        if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            context.drawImage(Assets.guiAtlas, Atlas.gui.restart1.x, Atlas.gui.restart1.y, Atlas.gui.restart1.width, Atlas.gui.restart1.height, x, y, width, height);
        } else  {
            context.drawImage(Assets.guiAtlas, Atlas.gui.restart2.x, Atlas.gui.restart2.y, Atlas.gui.restart2.width, Atlas.gui.restart2.height, x, y, width, height);
        }
        
        if (this.isClicked && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            //this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
            //this.canvas.removeEventListener("click", this.onMouseClickRef);
            //document.onkeydown = null;
            //document.onkeyup = null;
            this.controller.initLevel();
        } else {
            this.isClicked = false;
        }
    }
};
