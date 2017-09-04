function CreditsScene(context, canvas, callback) {
    this.context = context;
    this.canvas = canvas;
    this.callback = callback;
    this.isMouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.onMouseMoveRef = this.onMouseMove.bind(this);
    this.onMouseDownRef = this.onMouseDown.bind(this);
    this.onTouchStartRef = this.onTouchStart.bind(this);
    this.canvas.addEventListener("mousemove", this.onMouseMoveRef);
    this.canvas.addEventListener("mousedown", this.onMouseDownRef);
    this.canvas.addEventListener("touchstart", this.onTouchStartRef);
    this.endText = "The End";
}

CreditsScene.prototype.onMouseMove = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
};

CreditsScene.prototype.onTouchStart = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.touches[0].clientX - rect.left;
    this.mouseY = event.touches[0].clientY - rect.top;
    this.isMouseDown = true;
};

CreditsScene.prototype.onMouseDown = function(event) {
    this.isMouseDown = true;
};

CreditsScene.prototype.update = function(deltatime) {
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var width = Config.worldWidth * 0.7;
    var height = Config.worldHeight * 0.2;
    var x = Config.worldWidth / 2 - (width / 2);
    var y = Config.worldHeight / 2 - (height / 2);
    
    if (this.mouseX >= x && this.mouseX <= x + width 
                && this.mouseY >= y && this.mouseY <= y + height) {          
        this.context.font = "30px joystix";
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 3;
        this.context.strokeText(this.playText, Config.worldWidth / 2, Config.worldHeight / 2);
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.fillText(this.endText, Config.worldWidth / 2, Config.worldHeight / 2);          
    } else  {
        this.context.font = "30px joystix";
        this.context.strokeStyle = 'white';
        this.context.lineWidth = 3;
        this.context.strokeText(this.endText, Config.worldWidth / 2, Config.worldHeight / 2);
        this.context.fillStyle = "red";
        this.context.textAlign = "center";
        this.context.fillText(this.endText, Config.worldWidth / 2, Config.worldHeight / 2);
    }
    if (this.isMouseDown && this.mouseX <= x + width && this.mouseX >= x 
            && this.mouseY >= y && this.mouseY <= y + height) {
        this.canvas.removeEventListener("mousemove", this.onMouseMoveRef);
        this.canvas.removeEventListener("mousedown", this.onMouseDownRef);
        this.callback("main");
    } else {
        this.isMouseDown = false;
    }
};
