//####################################################################################################################################//

var trailLength = 10;
var timeOut = 20;
var trailSize = 15;
var tailSize = 30;
var trailTypes = ["Default","Emoji","RandomEmoji","WTF?","Custom"];
var trailType = trailTypes[0];
var emoji = "😂";
var imageUrl = "5.png"; 
var urlClick = "df.mp3";
var urlClickCustom =  "xd.mp3";

//####################################################################################################################################//
trail = $("#trailPointer");
trail.css( "height",trailSize+"px");
trail.css( "width",trailSize+"px");

class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}

function addPoint (x, y){
    points.push(new Point(x, y));
}


var points = new Array();


$(document).mousemove(function (e) {
    trail = $("#trailPointer");
    trail.css("visibility","visible");
    trail.css("top", e.pageY - trail.height() / 2);
    trail.css("left", e.pageX - trail.height() / 2);
    $('html').css("cursor","none");

    window.setTimeout(function () {
        X = e.pageX;
        Y = e.pageY;
        addPoint(X, Y);

    }, timeOut);
});


function update(){
    trail = $("#trailPointer");
    tail = $(".trail")
    for (let j = 0; j < points.length; j++) {
        var elem = document.createElement('div');
        var size = tailSize + "px";
        elem.style.position = "fixed";
        elem.style.top = points[j].y + "px";
        elem.style.left = points[j].x + "px";
        elem.style.width = size;
        elem.style.height = size;
        elem.style.userSelect = "none";  
        elem.style.pointerEvents = "none";
        elem.style.borderRadius = size;
        switch (trailType) {
            case "Default":
                elem.style.background = "rgba(0, 0, 0, "+(Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4)+")";
                break;
            case "Emoji":
                elem.append(emoji);
                break;
            case "RandomEmoji":
                var re = ["🤚🏾", "🖐🏾", "✋🏾", "🖖🏾", "👌🏾", "🤏🏾", "✌🏾", "🤞🏾", "🤟🏾"];
                elem.append(re[Math.floor(Math.random()*re.length)]);
                break;
            case "WTF?":
                elem.append("🏳️‍🌈");
                break;
            case "Custom":
                elem.style.background = 'url("' + imageUrl + '")';
                elem.style.backgroundSize = "100%";
                urlClick = urlClickCustom;
          }
        
        
        if(tail.children().length<trailLength){
            tail.append(elem);
        }
    }
}
setInterval(update, 0);


function changeContent() {
    tail = $(".trail");
    if(tail.children().length >= 0){
        points.shift();
        tail.find('div:first').remove();
    }
}
setInterval(changeContent, timeOut);

var btn = $('button');
btn.hover(function () {
    var trail = $("#trailPointer");
    trail.css("background-color", "rgba(245, 245, 245, 0.24)");
    trail.css("width", trailSize * 2);
    trail.css("height", trailSize * 2);
    btn.css("cursor","none");    

}, function () {
    var trail = $("#trailPointer");
    trail.css("background-color", "rgba(245, 245, 245, 0.24)");
    trail.css("width", trailSize);
    trail.css("height", trailSize);
});

btn.mousedown(function() {
    var trail = $("#trailPointer");
    trail.css("border","3px solid rgba(0, 0, 0, 0.3)");
});

btn.mouseup(function() {
    var trail = $("#trailPointer");
    trail.css("border","1px solid rgba(0, 0, 0, 0.616)");
});
btn.click(function(){
    new Audio(urlClick).play();
});
