function CreditsScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.callback = callback;
    this.backgroundX1 = 0;
    this.backgroundX2 = Config.worldWidth;
    this.music = Assets.playAudio(Assets.end_music, true);
    this.animation = new Animation(4, 1);
    this.shipY = Config.worldHeight - 180;
    
    this.texts = [
        {x: Config.worldWidth / 2, y: Config.worldHeight, text: "You,ve just completed the game!", red: 255, green: 255, blue: 61, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 40, text: "Our little man from other galaxy", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 80, text: "have just got enough gold to departure", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 120, text: "to his home planet", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 160, text: "Thanks for playing and helping him", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 200, text: "to achieve his goal.", red: 255, green: 255, blue: 255, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 260, text: "Game Programming", red: 255, green: 255, blue: 61, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 300, text: "jahepi", red: 255, green: 255, blue: 255, size: 15, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 340, text: "Game Assets", red: 255, green: 255, blue: 61, size: 20, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 400, text: "http://opengameart.org", red: 255, green: 255, blue: 255, size: 15, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 440, text: "https://www.gamedevmarket.net", red: 255, green: 255, blue: 255, size: 15, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 480, text: "http://www.gameart2d.com", red: 255, green: 255, blue: 255, size: 15, removed: false},
        {x: Config.worldWidth / 2, y: Config.worldHeight + 650, text: "THE END", red: 255, green: 255, blue: 255, size: 34, removed: false},
    ];
}

CreditsScene.prototype.update = function(deltatime) {
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.imageSmoothingEnabled = false;
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
    
    this.animation.update(deltatime);
    var key = "ship" + (this.animation.getFrame() + 1);
    this.context.drawImage(Assets.enemiesAtlas, Atlas.enemies[key].x, Atlas.enemies[key].y, Atlas.enemies[key].width, Atlas.enemies[key].height, Config.worldWidth - 100, this.shipY, Atlas.enemies[key].width * 2, Atlas.enemies[key].height * 2);
    this.shipY -= 10 * deltatime;
    
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
            this.texts[i].y -= 40 * deltatime;
        }
    }
    
    if (!flag) {
        this.music.stop();
        this.callback("main");
    }
};
