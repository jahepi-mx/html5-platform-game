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
        
        var width = Config.worldWidth * 0.7;
        var height = Config.worldHeight * 0.2;
        var x = Config.worldWidth / 2 - width / 2;
        var y = Config.worldHeight / 2 - height / 2;
    
        if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.context.font = "30px joystix";
            this.context.fillStyle = "yellow";
            this.context.fillText("You loose, try again?", Config.worldWidth / 2, Config.worldHeight / 2); 
        } else  {
            this.context.font = "30px joystix";
            this.context.fillStyle = "red";
            this.context.fillText("You loose, try again?", Config.worldWidth / 2, Config.worldHeight / 2);
        }
        
        if (this.isClicked && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            //this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
            //this.canvas.removeEventListener("click", this.onMouseClickRef);
            //document.onkeydown = null;
            //document.onkeyup = null;
            this.isClicked = false;
            this.controller.initLevel();
        } else {
            this.isClicked = false;
        }
    } else if (this.controller.isCurrentLevelFinish()) {
        
        var width = Config.worldWidth * 0.7;
        var height = Config.worldHeight * 0.2;
        var x = Config.worldWidth / 2 - width / 2;
        var y = Config.worldHeight / 2 - height / 2;
    
        if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.context.font = "20px joystix";
            this.context.fillStyle = "white";
            this.context.fillText("You win!, ready for the next level?", Config.worldWidth / 2, Config.worldHeight / 2); 
        } else  {
            this.context.font = "20px joystix";
            this.context.fillStyle = "green";
            this.context.fillText("You win!, ready for the next level?", Config.worldWidth / 2, Config.worldHeight / 2);
        }
        
        if (this.isClicked && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.isClicked = false;
            this.controller.nextLevel();
        } else {
            this.isClicked = false;
        }
    }
};
