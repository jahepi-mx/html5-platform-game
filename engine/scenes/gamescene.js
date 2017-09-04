function GameScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.callback = callback;
    this.controller = new Controller();
    this.render = new Render(this.context, this.canvas, this.controller);
    this.onKeyDownRef = this.onKeyDown.bind(this);
    this.onKeyUpRef = this.onKeyUp.bind(this);
    this.mouseX = 0;
    this.mouseY = 0;
    this.left = this.right = this.up = this.down = false;
    document.onkeydown = this.onKeyDownRef;
    document.onkeyup = this.onKeyUpRef;
    this.onMouseDownRef = this.onMouseDown.bind(this);
    this.onMouseUpRef = this.onMouseUp.bind(this);
    this.onTouchStartRef = this.onTouchStart.bind(this);
    this.onTouchEndRef = this.onTouchEnd.bind(this);
    this.onTouchMoveRef = this.onTouchMove.bind(this);
    this.onMouseMoveRef = this.onMouseMove.bind(this);
    this.canvas.addEventListener("mousemove", this.onMouseMoveRef);
    this.canvas.addEventListener("touchmove", this.onTouchMoveRef);
    this.canvas.addEventListener("mousedown", this.onMouseDownRef);
    this.canvas.addEventListener("mouseup", this.onMouseUpRef);
    this.canvas.addEventListener("touchstart", this.onTouchStartRef);
    this.canvas.addEventListener("touchend", this.onTouchEndRef);
    this.controlButtons = {
        a_button: {x: Config.worldWidth - 180, y: Config.worldHeight - 90, width: 80, height: 80, atlas: Atlas.gui["a_2"]},
        b_button: {x: Config.worldWidth - 90, y: Config.worldHeight - 90, width: 80, height: 80, atlas: Atlas.gui["b_2"]},
        left_button: {x: 10, y: Config.worldHeight - 110, width: 60, height: 60, atlas: Atlas.gui["left_2"]},
        right_button: {x: 100, y: Config.worldHeight - 110, width: 60, height: 60, atlas: Atlas.gui["right_2"]},
        down_button: {x: 55, y: Config.worldHeight - 70, width: 60, height: 60, atlas: Atlas.gui["down_2"]},
        up_button: {x: 55, y: Config.worldHeight - 150, width: 60, height: 60, atlas: Atlas.gui["up_2"]},
    };
    this.looseBtn = {x: Config.worldWidth / 2 - (Config.worldWidth * 0.7) / 2, y: Config.worldHeight / 2 - (Config.worldHeight * 0.2) / 2, width: Config.worldWidth * 0.7, height: Config.worldHeight * 0.2, text: "You loose, try again?"};
    this.winBtn = {x: Config.worldWidth / 2 - (Config.worldWidth * 0.7) / 2, y: Config.worldHeight / 2 - (Config.worldHeight * 0.2) / 2, width: Config.worldWidth * 0.7, height: Config.worldHeight * 0.2, text: "You win!, ready for the next level?"};
    this.lastLevelBtn = {x: Config.worldWidth / 2 - (Config.worldWidth * 0.7) / 2, y: Config.worldHeight / 2 - (Config.worldHeight * 0.2) / 2, width: Config.worldWidth * 0.7, height: Config.worldHeight * 0.2, text: "You have the courage to made it to the last level"};
}

GameScene.prototype.onMouseDown = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.onTouchEvent(event.clientX - rect.left, event.clientY - rect.top, true);
};

GameScene.prototype.onMouseUp = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.onTouchEvent(event.clientX - rect.left, event.clientY - rect.top, false);
};

GameScene.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
};

GameScene.prototype.onTouchStart = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    for (var i = 0; i < event.touches.length; i++) {
        this.onTouchEvent(event.touches[i].clientX - rect.left, event.touches[i].clientY - rect.top, true);
    }
};

GameScene.prototype.onTouchEnd = function(event) {
    this.left = this.right = this.up = this.down = false;
    var rect = this.canvas.getBoundingClientRect();
    for (var i = 0; i < event.touches.length; i++) {
        this.onTouchEvent(event.touches[i].clientX - rect.left, event.touches[i].clientY - rect.top, false);
    }
    if (!this.left) this.controller.moveLeft(false);
    if (!this.right) this.controller.moveRight(false);
    if (!this.up) this.controller.moveUp(false);
    if (!this.down) this.controller.moveDown(false);
};

GameScene.prototype.onTouchMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.touches[0].clientX - rect.left;
    this.mouseY = event.touches[0].clientY - rect.top;
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

GameScene.prototype.onTouchEvent = function(x, y, pressed) {
    for (var i in this.controlButtons) {
        var info = this.controlButtons[i];
        var width = info.width;
        var height = info.height;
        var buttonX = info.x;
        var buttonY = info.y;
        var left = false, right = false, up = false, down = false;
        if (x <= buttonX + width && x >= buttonX && y >= buttonY && y <= buttonY + height) {
            if (i === "a_button" && pressed) {
                this.controller.jump();
            } else if (i === "b_button" && pressed) {
                this.controller.shoot();
            } else if (i === "left_button") {
                if (!pressed) this.left = true;
                this.controller.moveLeft(pressed);
            } else if (i === "right_button") {
                if (!pressed) this.right = true;
                this.controller.moveRight(pressed);
            } else if (i === "up_button") {
                if (!pressed) this.up = true;
                this.controller.moveUp(pressed);
            } else if (i === "down_button") {
                if (!pressed) this.down = true;
                this.controller.moveDown(pressed);
            }
        }
    }
    if (this.render.isHeroDead() && x <= this.looseBtn.x + this.looseBtn.width && x >= this.looseBtn.x 
            && y >= this.looseBtn.y && y <= this.looseBtn.y + this.looseBtn.height) {
        this.controller.initLevel();
    }
    if (this.render.isCurrentLevelFinish() && !this.render.isLastLevel() && x <= this.winBtn.x + this.winBtn.width && x >= this.winBtn.x 
            && y >= this.winBtn.y && y <= this.winBtn.y + this.winBtn.height) {
        this.controller.nextLevel();
    }
    if (this.render.isCurrentLevelFinish() && this.render.isLastLevel() && x <= this.lastLevelBtn.x + this.lastLevelBtn.width && x >= this.lastLevelBtn.x 
            && y >= this.lastLevelBtn.y && y <= this.lastLevelBtn.y + this.lastLevelBtn.height) {
        this.canvas.removeEventListener("mousedown", this.onMouseDownRef);
        this.canvas.removeEventListener("mouseup", this.onMouseUpRef);
        this.canvas.removeEventListener("touchstart", this.onTouchStartRef);
        this.canvas.removeEventListener("touchend", this.onTouchEndRef);
        this.canvas.removeEventListener("touchmove", this.onTouchMoveRef);
        this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
        document.onkeydown = null;
        document.onkeyup = null;
        this.callback("credits");
    }
};

GameScene.prototype.update = function(deltatime) {
    this.render.update(deltatime);
    
    if (this.render.isHeroDead()) {
    
        if (this.mouseX >= this.looseBtn.x && this.mouseX <= this.looseBtn.x + this.looseBtn.width 
                && this.mouseY >= this.looseBtn.y && this.mouseY <= this.looseBtn.y + this.looseBtn.height) {
            this.context.font = "30px joystix";
            this.context.strokeStyle = 'red';
            this.context.lineWidth = 20;
            this.context.strokeText(this.looseBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
            this.context.fillStyle = "white";
            this.context.fillText(this.looseBtn.text, Config.worldWidth / 2, Config.worldHeight / 2); 
        } else  {
            this.context.font = "30px joystix";
            this.context.strokeStyle = 'white';
            this.context.lineWidth = 20;
            this.context.strokeText(this.looseBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
            this.context.fillStyle = "red";
            this.context.fillText(this.looseBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
        }
        
    } else if (this.render.isCurrentLevelFinish()) {

        if (this.render.isLastLevel()) {
            
            if (this.mouseX >= this.lastLevelBtn.x && this.mouseX <= this.lastLevelBtn.x + this.lastLevelBtn.width
                    && this.mouseY >= this.lastLevelBtn.y && this.mouseY <= this.lastLevelBtn.y + this.lastLevelBtn.height) {
                this.context.font = "30px joystix";
                this.context.strokeStyle = '#00E500';
                this.context.lineWidth = 20;
                this.context.strokeText(this.lastLevelBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = "white";
                this.context.fillText(this.lastLevelBtn.text, Config.worldWidth / 2, Config.worldHeight / 2); 
            } else  {
                this.context.font = "30px joystix";
                this.context.strokeStyle = 'white';
                this.context.lineWidth = 20;
                this.context.strokeText(this.lastLevelBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = '#00E500';
                this.context.fillText(this.lastLevelBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
            }
            
        } else {
        
            if (this.mouseX >= this.winBtn.x && this.mouseX <= this.winBtn.x + this.winBtn.width
                    && this.mouseY >= this.winBtn.y && this.mouseY <= this.winBtn.y + this.winBtn.height) {
                this.context.font = "30px joystix";
                this.context.strokeStyle = '#00E500';
                this.context.lineWidth = 20;
                this.context.strokeText(this.winBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = "white";
                this.context.fillText(this.winBtn.text, Config.worldWidth / 2, Config.worldHeight / 2); 
            } else  {
                this.context.font = "30px joystix";
                this.context.strokeStyle = 'white';
                this.context.lineWidth = 20;
                this.context.strokeText(this.winBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = '#00E500';
                this.context.fillText(this.winBtn.text, Config.worldWidth / 2, Config.worldHeight / 2);
            }
        }
    } else {        
        for (var i in this.controlButtons) {
            var info = this.controlButtons[i];
            this.context.drawImage(Assets.guiAtlas, info.atlas.x, info.atlas.y, info.atlas.width, info.atlas.height, info.x, info.y, info.width, info.height);
        }
    }
};