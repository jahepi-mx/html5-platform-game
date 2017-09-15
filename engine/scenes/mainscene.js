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
    this.startIntro = false;
    this.alphaButton = 1;
    
    this.texts = [
        {x: Config.worldWidth / 2, y: Config.worldHeight, text: "Once upon a time a man from other galaxy", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 40, text: "Had to land on the earth,", red: 255, green: 255, blue: 255, size: 20, removed: false}, 
        {x: Config.worldWidth / 2, y: Config.worldHeight + 80, text: "it´s ship ran out of fuel,", red: 255, green: 255, blue: 255, size: 20, removed: false}, 
        {x: Config.worldWidth / 2, y: Config.worldHeight + 120, text: "and the main source of it is gold.", red: 255, green: 255, blue: 255, size: 20, removed: false}, 
        {x: Config.worldWidth / 2, y: Config.worldHeight + 160, text: "He discovered several places", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 200, text: "where this resource can be found", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 240, text: "in form of coins, the problem is that", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 280, text: "in order to get them he has to", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 320, text: "fight against some evil entities.", red: 255, green: 255, blue: 255, size: 20, removed: false},
    ];
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
    var width = Config.worldWidth * 0.3;
    var height = Config.worldHeight * 0.1;
    var x = Config.worldWidth / 2 - (width / 2);
    var y = Config.worldHeight / 2 - (height / 2);
    
    if (!this.isLoading) {
        
        this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.moonlight_background.x, Atlas.tiles.moonlight_background.y, Atlas.tiles.moonlight_background.width, Atlas.tiles.moonlight_background.height, 0, 0, this.canvas.width, this.canvas.height);
        
        this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.ground_background.x, Atlas.tiles.ground_background.y, Atlas.tiles.ground_background.width, Atlas.tiles.ground_background.height, this.backgroundX1, 0, this.canvas.width + 5, this.canvas.height);
        this.context.drawImage(Assets.tilesAtlas, Atlas.tiles.ground_background.x, Atlas.tiles.ground_background.y, Atlas.tiles.ground_background.width, Atlas.tiles.ground_background.height, this.backgroundX2, 0, this.canvas.width + 5, this.canvas.height);
        
        this.backgroundX1 -= 50 * deltatime;
        this.backgroundX2 -= 50 * deltatime;
        if (this.backgroundX1 + Config.worldWidth <= 0) {
            this.backgroundX1 = Config.worldWidth;
        }
        if (this.backgroundX2 + Config.worldWidth <= 0) {
            this.backgroundX2 = Config.worldWidth;
        }
        
        if (this.startIntro) {
            
            if (this.alphaButton > 0) {
                this.alphaButton -= 0.5 * deltatime;
            }
            
            if (this.alphaButton <= 0) {
                var flag = false;
                for (var i = 0; i < this.texts.length; i++) {
                    if (this.texts[i].y <= 0) {
                        this.texts[i].removed = true;
                    }
                    if (!this.texts[i].removed) {
                        flag = true;
                        var alpha = this.texts[i].y / Config.worldHeight;
                        this.context.font = this.texts[i].size + "px joystix";
                        this.context.fillStyle = "rgba(" + this.texts[i].red + ", " + this.texts[i].green + ", " + this.texts[i].blue + ", " + alpha + ")";
                        this.context.textAlign = "center";
                        this.context.fillText(this.texts[i].text, this.texts[i].x, this.texts[i].y);
                        this.texts[i].y -= 30 * deltatime;
                    }
                }
                if (!flag) {
                    this.music.stop();
                    this.callback("game");
                }
            }
        }
        
        if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {          
            this.context.font = "30px joystix";
            this.context.fillStyle = "rgba(255, 0, 0, " + this.alphaButton + ")";
            this.context.textAlign = "center";
            this.context.fillText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);          
        } else  {
            this.context.font = "30px joystix";
            this.context.fillStyle = "rgba(255, 255, 255, " + this.alphaButton + ")";
            this.context.textAlign = "center";
            this.context.fillText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);
        }
        
        this.context.font = "15px joystix";
        this.context.fillStyle = "rgba(255, 255, 0, " + this.alphaButton + ")";
        this.context.textAlign = "center";
        this.context.fillText("GET ALL COINS!", Config.worldWidth / 2, Config.worldHeight - 100);
            
        if (this.isMouseDown && !this.startIntro && this.mouseX <= x + width && this.mouseX >= x 
                && this.mouseY >= y && this.mouseY <= y + height) {
            this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
            this.canvas.removeEventListener("mousedown", this.onMouseDownRef);
            this.canvas.removeEventListener("touchstart", this.onTouchStartRef);
            this.startIntro = true;
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