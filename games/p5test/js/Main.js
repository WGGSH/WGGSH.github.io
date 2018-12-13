/// <reference path="p5.global-mode.d.ts" />
// http://neos21.hatenablog.com/entry/2017/10/13/080000
function setup() {
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    // DeviceOrientation Event
    window.addEventListener("deviceorientation", deviceorientationHandler);
    createCanvas(windowWidth, windowHeight, WEBGL);
}
var val = 0;
var x = 0;
var y = 0;
var z = 0;
function draw() {
    // background(val % 255);
    background(0);
    val++;
    stroke(255);
    noFill();
    // text('(x,y,z)=(' + x + ',' + y + ',' + z + ')', 10, 10);
    // translate(width / 2, height / 2);
    var vec = new p5.Vector(x, y, z);
    vec.normalize();
    vec.mult(300);
    rotateY(y / 180 * PI);
    rotateX(-x / 180 * PI);
    rotateZ(-z / 180 * PI);
    box(150);
    // line(0, 0, 0, vec.x, vec.y, vec.z);
}
// ジャイロセンサーの値が変化
function deviceorientationHandler(event) {
    // X軸
    x = event.beta;
    // Y軸
    y = event.gamma;
    // Z軸
    z = event.alpha;
}
//# sourceMappingURL=Main.js.map