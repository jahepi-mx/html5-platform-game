Assets = {};
Assets.loaded = false;

Assets.srcs = [
    "assets/tiles/sprites.png", 
    "assets/hero/sprites.png", 
    "assets/enemies/sprites.png", 
    "assets/gui/sprites.png"
];

Assets.keys = [
    "tilesAtlas", 
    "heroAtlas", 
    "enemiesAtlas",
    "guiAtlas"
];

Assets.audio = {};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
Assets.audioContext = new AudioContext();

Assets.audio.srcs = [
    "assets/audio/level1_music.mp3",
    "assets/audio/end_music.mp3",
    "assets/audio/main_music.mp3",
    "assets/audio/coin_sound.mp3",
    "assets/audio/enemy_laser_sound.mp3",
    "assets/audio/hero_laser_sound.mp3",
    "assets/audio/explosion_sound.mp3",
    "assets/audio/jump_sound.mp3",
];

Assets.audio.keys = [
    "level1_music", 
    "end_music", 
    "main_music", 
    "coin_sound",
    "enemy_laser_sound",
    "hero_laser_sound",
    "explosion_sound",
    "jump_sound",
];

Assets.callback = null;

Assets.loadAll = function(callback) {
    Assets.callback = callback;
    for (var i = 0; i < Assets.keys.length; i++) {
        Assets[Assets.keys[i]] = new Image();
    }
    Assets.load(0);
};

Assets.load = function(index) {
    Assets[Assets.keys[index]].onload = function() {
        if (index + 1 >= Assets.srcs.length) {
            Assets.loadAllAudios();
        } else {
            Assets.load(index + 1);
        }
    };
    Assets[Assets.keys[index]].src = Assets.srcs[index];
};

Assets.loadAllAudios = function() {
    Assets.loadAudio(0);
};

Assets.loadAudio = function(index) {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", Assets.audio.srcs[index], true);
    xmlRequest.responseType = "arraybuffer";
    xmlRequest.onload = function() {
        Assets.audioContext.decodeAudioData(xmlRequest.response, function(buffer) {
            Assets[Assets.audio.keys[index]] = buffer;
        }, null);
        if (index + 1 >= Assets.audio.srcs.length) {
            Assets.loaded = true;
            if (Assets.callback !== null) {
                Assets.callback();
            }
        } else {
            Assets.loadAudio(index + 1);
        }
    };
    xmlRequest.send();
};

Assets.playAudio = function(buffer, loop) {
    var source = Assets.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(Assets.audioContext.destination);
    source.start(0);
    return source;
};