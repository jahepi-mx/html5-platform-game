function MainScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.callback = callback;
    this.isLoading = true;
    this.isClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;
    if (Assets.loaded && Atlas.loaded) {
        this.isLoading = false;
    } else {
        Assets.loadAll(this.onLoadAssets.bind(this));
    }
    this.onMouseMoveRef = this.onMouseMove.bind(this);
    this.onMouseClickRef = this.onMouseClick.bind(this);
    this.canvas.addEventListener("mousemove", this.onMouseMoveRef);
    this.canvas.addEventListener("click", this.onMouseClickRef);
    this.playText = "Play Game";
}

MainScene.prototype.onLoadAssets = function() {
    Atlas.loadAll(this.onLoadAtlas.bind(this));
};

MainScene.prototype.onLoadAtlas = function() {
    this.isLoading = false;
};

MainScene.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
};

MainScene.prototype.onMouseClick = function(event) {
    this.isClicked = true;
};

MainScene.prototype.update = function(deltatime) {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var width = Config.worldWidth * 0.7;
    var height = Config.worldHeight * 0.2;
    var x = Config.worldWidth / 2 - (width / 2);
    var y = Config.worldHeight / 2 - (height / 2);
    
    if (!this.isLoading) {
        if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {          
            this.context.font = "30px joystix";
            this.context.strokeStyle = 'red';
            this.context.lineWidth = 3;
            this.context.strokeText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);
            this.context.fillStyle = "white";
            this.context.textAlign = "center";
            this.context.fillText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);          
        } else  {
            this.context.font = "30px joystix";
            this.context.strokeStyle = 'white';
            this.context.lineWidth = 3;
            this.context.strokeText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);
            this.context.fillStyle = "red";
            this.context.textAlign = "center";
            this.context.fillText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);
        }
        
        this.context.font = "15px joystix";
        this.context.fillStyle = "yellow";
        this.context.textAlign = "center";
        this.context.fillText("The objetive of the game is to collect all the coins on each level", Config.worldWidth / 2, Config.worldHeight - 100);
            
        if (this.isClicked && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
            this.canvas.removeEventListener("click", this.onMouseClickRef);
            this.callback("game");
        } else {
            this.isClicked = false;
        }
    } else {
        this.context.font = "30px joystix";
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.fillText("Loading...", Config.worldWidth / 2, Config.worldHeight / 2);
    }      
};