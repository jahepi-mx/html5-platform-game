function MainScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.callback = callback;
    this.isLoading = true;
    this.isMouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.music = null;
    if (Assets.loaded && Atlas.loaded) {
        this.isLoading = false;
        this.music = Assets.playAudio(Assets.main_music, true);
    } else {
        Assets.loadAll(this.onLoadAssets.bind(this));
    }
    this.onMouseMoveRef = this.onMouseMove.bind(this);
    this.onMouseDownRef = this.onMouseDown.bind(this);
    this.onTouchStartRef = this.onTouchStart.bind(this);
    this.canvas.addEventListener("mousemove", this.onMouseMoveRef);
    this.canvas.addEventListener("mousedown", this.onMouseDownRef);
    this.canvas.addEventListener("touchstart", this.onTouchStartRef);
    this.playText = "Play Game";
    this.backgroundX1 = 0;
    this.backgroundX2 = Config.worldWidth;
}

MainScene.prototype.onLoadAssets = function() {
    Atlas.loadAll(this.onLoadAtlas.bind(this));
    this.music = Assets.playAudio(Assets.main_music, true);
};

MainScene.prototype.onLoadAtlas = function() {
    this.isLoading = false;
};

MainScene.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
};

MainScene.prototype.onTouchStart = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.touches[0].clientX - rect.left;
    this.mouseY = event.touches[0].clientY - rect.top;
    this.isMouseDown = true;
};

MainScene.prototype.onMouseDown = function(event) {
    this.isMouseDown = true;
};

MainScene.prototype.update = function(deltatime) {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.imageSmoothingEnabled = false;
    var width = Config.worldWidth * 0.7;
    var height = Config.worldHeight * 0.2;
    var x = Config.worldWidth / 2 - (width / 2);
    var y = Config.worldHeight / 2 - (height / 2);
    
    if (!this.isLoading) {
        this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.moonlight_background.x, Atlas.tiles.moonlight_background.y, Atlas.tiles.moonlight_background.width, Atlas.tiles.moonlight_background.height, 0, 0, this.canvas.width, this.canvas.height);
        
        this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.ground_background.x, Atlas.tiles.ground_background.y, Atlas.tiles.ground_background.width, Atlas.tiles.ground_background.height, this.backgroundX1, 0, this.canvas.width + 1, this.canvas.height);
        this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.ground_background.x, Atlas.tiles.ground_background.y, Atlas.tiles.ground_background.width, Atlas.tiles.ground_background.height, this.backgroundX2, 0, this.canvas.width + 1, this.canvas.height);
        
        this.backgroundX1 -= 50 * deltatime;
        this.backgroundX2 -= 50 * deltatime;
        if (this.backgroundX1 + Config.worldWidth <= 0) {
            this.backgroundX1 = Config.worldWidth;
        }
        if (this.backgroundX2 + Config.worldWidth <= 0) {
            this.backgroundX2 = Config.worldWidth;
        }
        
        if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {          
            this.context.font = "30px joystix";
            this.context.fillStyle = "red";
            this.context.textAlign = "center";
            this.context.fillText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);          
        } else  {
            this.context.font = "30px joystix";
            this.context.fillStyle = "white";
            this.context.textAlign = "center";
            this.context.fillText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);
        }
        
        this.context.font = "15px joystix";
        this.context.fillStyle = "yellow";
        this.context.textAlign = "center";
        this.context.fillText("GET ALL COINS!", Config.worldWidth / 2, Config.worldHeight - 100);
            
        if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
            this.canvas.removeEventListener("mousedown", this.onMouseDownRef);
            this.canvas.removeEventListener("touchstart", this.onTouchStartRef);
            this.music.stop();
            this.callback("game");
        } else {
            this.isMouseDown = false;
        }
    } else {
        this.context.font = "30px joystix";
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.fillText("Loading...", Config.worldWidth / 2, Config.worldHeight / 2);
    }      
};