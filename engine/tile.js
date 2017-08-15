Object.defineProperty(Tile, "WALL_TYPE", { value: "WALL_TYPE" });
Object.defineProperty(Tile, "PLATFORM_TYPE", { value: "PLATFORM_TYPE" });
Object.defineProperty(Tile, "TEXTURE_TYPE", { value: "TEXTURE" });

function Tile(x, y, width, height, typeIndex, camera) {
    this.x = x * width;
    this.y = y * height;
    this.width = width;
    this.height = height;
    this.typeIndex = typeIndex;
    this.camera = camera;
    this.type = Tile.WALL_TYPE;
    if (this.typeIndex === 2 
            || this.typeIndex === 3 
            || this.typeIndex === 4 
            || this.typeIndex === 5) {
        this.type = Tile.PLATFORM_TYPE;
    } else if (this.typeIndex === 0 
            || this.typeIndex === 6) {
        this.type = Tile.TEXTURE_TYPE;
    }
}

Tile.prototype.left = function() {
    return this.x - this.camera.x;
};

Tile.prototype.right = function() {
    return (this.x + this.width) - this.camera.x;
};

Tile.prototype.top = function() {
    return this.y - this.camera.y;
};

Tile.prototype.bottom = function() {
    return (this.y + this.height) - this.camera.y;
};

Tile.prototype.draw = function(context) {
    if (Config.debug) {
        context.fillStyle = "white";
        context.fillRect(this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
    } else {
        if (this.typeIndex === 1) {
            context.drawImage(Assets.tiles.wall, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 2) {
            context.drawImage(Assets.tiles.platform_left, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 3) {
            context.drawImage(Assets.tiles.platform_center, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 4) {
            context.drawImage(Assets.tiles.platform_right, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 5) {
            context.drawImage(Assets.tiles.platform, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 6) {
            context.drawImage(Assets.tiles.acid, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 0) {
            context.drawImage(Assets.tiles.background, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        }
    }
};
