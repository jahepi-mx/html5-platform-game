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
    this.isMouseDown = false;
    this.isKeyLeftDown = false;
    this.isKeyRightDown = false;
    this.isKeyUpDown = false;
    this.isKeyDownDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.onMouseMoveRef = this.onMouseMove.bind(this);
    this.onMouseDownRef = this.onMouseDown.bind(this);
    this.onMouseUpRef = this.onMouseUp.bind(this);
    this.canvas.addEventListener("mousemove", this.onMouseMoveRef);
    this.canvas.addEventListener("mousedown", this.onMouseDownRef);
    this.canvas.addEventListener("mouseup", this.onMouseUpRef);
    this.looseText = "You loose, try again?";
    this.winText = "You win!, ready for the next level?";
    this.lastLevelText = "You have the courage to made it to the last level";
}

GameScene.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
};

GameScene.prototype.onMouseDown = function(event) {
    this.isMouseDown = true;
};

GameScene.prototype.onMouseUp = function(event) {
    this.isMouseDown = false;
};

GameScene.prototype.onKeyDown = function(e) {
    e = e || window.event;
    if (e.keyCode === 32) this.controller.jump();
    if (e.keyCode === 37) {
        this.isKeyLeftDown = true;
        this.controller.moveLeft(true);
    }
    if (e.keyCode === 39) {
        this.isKeyRightDown = true;
        this.controller.moveRight(true);
    }
    if (e.keyCode === 38) {
        this.isKeyUpDown = true;
        this.controller.moveUp(true);
    }
    if (e.keyCode === 40) {
        this.isKeyDownDown = true;
        this.controller.moveDown(true);
    }
    if (e.keyCode === 65) this.controller.shoot();
};

GameScene.prototype.onKeyUp = function(e) {
    e = e || window.event;
    if (e.keyCode === 37) {
        this.isKeyLeftDown = false;
        this.controller.moveLeft(false);
    }
    if (e.keyCode === 39) {
        this.isKeyRightDown = false;
        this.controller.moveRight(false);
    }
    if (e.keyCode === 38) {
        this.isKeyUpDown = false;
        this.controller.moveUp(false);
    }
    if (e.keyCode === 40) {
        this.isKeyDownDown = false;
        this.controller.moveDown(false);
    }
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
            this.context.strokeStyle = 'red';
            this.context.lineWidth = 20;
            this.context.strokeText(this.looseText, Config.worldWidth / 2, Config.worldHeight / 2);
            this.context.fillStyle = "white";
            this.context.fillText(this.looseText, Config.worldWidth / 2, Config.worldHeight / 2); 
        } else  {
            this.context.font = "30px joystix";
            this.context.strokeStyle = 'white';
            this.context.lineWidth = 20;
            this.context.strokeText(this.looseText, Config.worldWidth / 2, Config.worldHeight / 2);
            this.context.fillStyle = "red";
            this.context.fillText(this.looseText, Config.worldWidth / 2, Config.worldHeight / 2);
        }
        
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.controller.initLevel();
        }
    } else if (this.render.isCurrentLevelFinish()) {
        
        var width = Config.worldWidth * 0.7;
        var height = Config.worldHeight * 0.2;
        var x = Config.worldWidth / 2 - width / 2;
        var y = Config.worldHeight / 2 - height / 2;
        
        if (this.render.isLastLevel()) {
            
            if (this.mouseX >= x && this.mouseX <= x + width && this.mouseX >= x
                    && this.mouseY >= y && this.mouseY <= y + height) {
                this.context.font = "30px joystix";
                this.context.strokeStyle = '#00E500';
                this.context.lineWidth = 20;
                this.context.strokeText(this.lastLevelText, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = "white";
                this.context.fillText(this.lastLevelText, Config.worldWidth / 2, Config.worldHeight / 2); 
            } else  {
                this.context.font = "30px joystix";
                this.context.strokeStyle = 'white';
                this.context.lineWidth = 20;
                this.context.strokeText(this.lastLevelText, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = '#00E500';
                this.context.fillText(this.lastLevelText, Config.worldWidth / 2, Config.worldHeight / 2);
            }

            if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                    && this.mouseY >= y && this.mouseY <= y + height) {
                
                this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
                this.canvas.removeEventListener("mousedown", this.onMouseDownRef);
                this.canvas.removeEventListener("mouseup", this.onMouseUpRef);
                document.onkeydown = null;
                document.onkeyup = null;
            
                this.callback("credits");
            }
        } else {
        
            if (this.mouseX >= x && this.mouseX <= x + width && this.mouseX >= x
                    && this.mouseY >= y && this.mouseY <= y + height) {
                this.context.font = "30px joystix";
                this.context.strokeStyle = '#00E500';
                this.context.lineWidth = 20;
                this.context.strokeText(this.winText, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = "white";
                this.context.fillText(this.winText, Config.worldWidth / 2, Config.worldHeight / 2); 
            } else  {
                this.context.font = "30px joystix";
                this.context.strokeStyle = 'white';
                this.context.lineWidth = 20;
                this.context.strokeText(this.winText, Config.worldWidth / 2, Config.worldHeight / 2);
                this.context.fillStyle = '#00E500';
                this.context.fillText(this.winText, Config.worldWidth / 2, Config.worldHeight / 2);
            }

            if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                    && this.mouseY >= y && this.mouseY <= y + height) {
                this.controller.nextLevel();
            }
        }
    } else {
        
        var width = 80;
        var height = 80;
        var x = Config.worldWidth - 180;
        var y = Config.worldHeight - 90;
        context.drawImage(Assets.guiAtlas, Atlas.gui["a_2"].x, Atlas.gui["a_2"].y, Atlas.gui["a_2"].width, Atlas.gui["a_2"].height, x, y, width, height);
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.controller.shoot();
        }
        
        var width = 80;
        var height = 80;
        var x = Config.worldWidth - 90;
        var y = Config.worldHeight - 90;
        context.drawImage(Assets.guiAtlas, Atlas.gui["b_2"].x, Atlas.gui["b_2"].y, Atlas.gui["b_2"].width, Atlas.gui["b_2"].height, x, y, width, height);
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.controller.jump();
        }
        
        var width = 60;
        var height = 60;
        var x = 10;
        var y = Config.worldHeight - 110;
        context.drawImage(Assets.guiAtlas, Atlas.gui["left_2"].x, Atlas.gui["left_2"].y, Atlas.gui["left_2"].width, Atlas.gui["left_2"].height, x, y, width, height);
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.controller.moveLeft(true);
        } else {
            if (!this.isKeyDown()) this.controller.moveLeft(false);
        }
        
        var width = 60;
        var height = 60;
        var x = 100;
        var y = Config.worldHeight - 110;
        context.drawImage(Assets.guiAtlas, Atlas.gui["right_2"].x, Atlas.gui["right_2"].y, Atlas.gui["right_2"].width, Atlas.gui["right_2"].height, x, y, width, height);
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.controller.moveRight(true);
        } else {
            if (!this.isKeyDown()) this.controller.moveRight(false);
        }
        
        var width = 60;
        var height = 60;
        var x = 55;
        var y = Config.worldHeight - 70;
        context.drawImage(Assets.guiAtlas, Atlas.gui["down_2"].x, Atlas.gui["down_2"].y, Atlas.gui["down_2"].width, Atlas.gui["down_2"].height, x, y, width, height);
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.controller.moveDown(true);
        } else {
            if (!this.isKeyDown()) this.controller.moveDown(false);
        }
        
        var width = 60;
        var height = 60;
        var x = 55;
        var y = Config.worldHeight - 150;
        context.drawImage(Assets.guiAtlas, Atlas.gui["up_2"].x, Atlas.gui["up_2"].y, Atlas.gui["up_2"].width, Atlas.gui["up_2"].height, x, y, width, height);
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.controller.moveUp(true);
        } else {
            if (!this.isKeyDown()) this.controller.moveUp(false);
        }
    }
};

GameScene.prototype.isKeyDown = function() {
    return this.isKeyLeftDown || this.isKeyRightDown || this.isKeyUpDown || this.isKeyDownDown;
};
