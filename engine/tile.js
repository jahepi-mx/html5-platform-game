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
            context.drawImage(Assets.tilesAtlas, Atlas.tiles.wall.x, Atlas.tiles.wall.y, Atlas.tiles.wall.width, Atlas.tiles.wall.height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 2) {
            context.drawImage(Assets.tilesAtlas, Atlas.tiles.platform_left.x, Atlas.tiles.platform_left.y, Atlas.tiles.platform_left.width, Atlas.tiles.platform_left.height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 3) {
            context.drawImage(Assets.tilesAtlas, Atlas.tiles.platform_center.x, Atlas.tiles.platform_center.y, Atlas.tiles.platform_center.width, Atlas.tiles.platform_center.height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 4) {
            context.drawImage(Assets.tilesAtlas, Atlas.tiles.platform_right.x, Atlas.tiles.platform_right.y, Atlas.tiles.platform_right.width, Atlas.tiles.platform_right.height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 5) {
            context.drawImage(Assets.tilesAtlas, Atlas.tiles.platform.x, Atlas.tiles.platform.y, Atlas.tiles.platform.width, Atlas.tiles.platform.height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 6) {
            context.drawImage(Assets.tilesAtlas, Atlas.tiles.acid.x, Atlas.tiles.acid.y, Atlas.tiles.acid.width, Atlas.tiles.acid.height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        } else if (this.typeIndex === 0) {
            context.drawImage(Assets.tilesAtlas, Atlas.tiles.background.x, Atlas.tiles.background.y, Atlas.tiles.background.width, Atlas.tiles.background.height, this.x - this.camera.x, this.y - this.camera.y, this.width, this.height);
        }
    }
};
