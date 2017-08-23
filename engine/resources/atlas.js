Atlas = {};

Atlas.tiles = {};
Atlas.hero = {};
Atlas.enemies = {};

Atlas.xmls = ["assets/tiles/sprites.xml", "assets/hero/sprites.xml", "assets/enemies/sprites.xml"];
Atlas.keys = ["tiles", "hero", "enemies"];

Atlas.loadAll = function(successCb, errorCb) {
    Atlas.load(0, successCb, errorCb);
};

Atlas.load = function(index, successCb, errorCb) {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", Atlas.xmls[index], true);
    xmlRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
           var xml = xmlRequest.responseXML;
           var elements = xml.getElementsByTagName("SubTexture");
           for (var i = 0; i < elements.length; i++) {
               var name = elements[i].getAttribute("name");
               name = name.replace(".png", "");
               var x = elements[i].getAttribute("x");
               var y = elements[i].getAttribute("y");
               var width = elements[i].getAttribute("width");
               var height = elements[i].getAttribute("height");
               Atlas[Atlas.keys[index]][name] = {x: x, y: y, width: width, height: height};
           }
        }
        if (index + 1 >= Atlas.xmls.length) {
            if (successCb !== null) {
                successCb();
            }
        } else {
            Atlas.load(index + 1, successCb, errorCb);
        }
    };
    xmlRequest.send();
};
/*
var xmlRequest = new XMLHttpRequest();
xmlRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
       var xml = xmlRequest.responseXML;
       var elements = xml.getElementsByTagName("SubTexture");
       for (var i = 0; i < elements.length; i++) {
           var name = elements[i].getAttribute("name");
           name = name.replace(".png", "");
           var x = elements[i].getAttribute("x");
           var y = elements[i].getAttribute("y");
           var width = elements[i].getAttribute("width");
           var height = elements[i].getAttribute("height");
           Atlas.tiles[name] = {x: x, y: y, width: width, height: height};
       }
    }
};
xmlRequest.open("GET", "assets/tiles/sprites.xml", true);
xmlRequest.send();

var xmlRequest2 = new XMLHttpRequest();
xmlRequest2.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
       var xml = xmlRequest2.responseXML;
       var elements = xml.getElementsByTagName("SubTexture");
       for (var i = 0; i < elements.length; i++) {
           var name = elements[i].getAttribute("name");
           name = name.replace(".png", "");
           var x = elements[i].getAttribute("x");
           var y = elements[i].getAttribute("y");
           var width = elements[i].getAttribute("width");
           var height = elements[i].getAttribute("height");
           Atlas.hero[name] = {x: x, y: y, width: width, height: height};
       }
    }
};
xmlRequest2.open("GET", "assets/hero/sprites.xml", true);
xmlRequest2.send();

var xmlRequest3 = new XMLHttpRequest();
xmlRequest3.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
       var xml = xmlRequest3.responseXML;
       var elements = xml.getElementsByTagName("SubTexture");
       for (var i = 0; i < elements.length; i++) {
           var name = elements[i].getAttribute("name");
           name = name.replace(".png", "");
           var x = elements[i].getAttribute("x");
           var y = elements[i].getAttribute("y");
           var width = elements[i].getAttribute("width");
           var height = elements[i].getAttribute("height");
           Atlas.enemies[name] = {x: x, y: y, width: width, height: height};
       }
    }
};
xmlRequest3.open("GET", "assets/enemies/sprites.xml", true);
xmlRequest3.send();
*/