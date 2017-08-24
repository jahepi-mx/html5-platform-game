function MainScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.callback = callback;
    this.isLoading = true;
    this.isClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;
    Assets.loadAll(this.onLoadAssets.bind(this));
    this.onMouseMoveRef = this.onMouseMove.bind(this);
    this.onMouseClickRef = this.onMouseClick.bind(this);
    this.canvas.addEventListener("mousemove", this.onMouseMoveRef);
    this.canvas.addEventListener("click", this.onMouseClickRef);
}

MainScene.prototype.onLoadAssets = function() {
    Atlas.loadAll(this.onLoadAtlas.bind(this));
};

MainScene.prototype.onLoadAtlas = function() {
    this.isLoading = false;
};

MainScene.prototype.onMouseMove = function(event) {
    console.log("moving");
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
};

MainScene.prototype.onMouseClick = function(event) {
    this.isClicked = true;
};

MainScene.prototype.update = function(deltatime) {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var width = 252;
    var height = 100;
    var x = Config.worldWidth / 2 - (width / 2);
    var y = Config.worldHeight / 2 - (height / 2);
    
    if (!this.isLoading) {
        if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            context.drawImage(Assets.guiAtlas, Atlas.gui.play1.x, Atlas.gui.play1.y, Atlas.gui.play1.width, Atlas.gui.play1.height, x, y, width, height);
        } else  {
            context.drawImage(Assets.guiAtlas, Atlas.gui.play2.x, Atlas.gui.play2.y, Atlas.gui.play2.width, Atlas.gui.play2.height, x, y, width, height);
        }
        
        if (this.isClicked && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
            this.canvas.removeEventListener("click", this.onMouseClickRef);
            this.callback("game");
        } else {
            this.isClicked = false;
        }
    }      
};