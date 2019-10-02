/// <reference path="p5.global-mode.d.ts" />
var Particle = /** @class */ (function () {
    function Particle(p5, position, vector, accel) {
        this.p = p5;
        this.position = position;
        this.vector = vector;
        this.accel = accel;
        this.time = 0;
    }
    Particle.prototype.update = function () {
        this.time++;
        if (this.time === 1)
            return;
        this.vector.add(this.accel);
        this.position.add(this.vector);
        this.p.noStroke();
        for (var i = 0; i < 30; i++) {
            this.p.fill(180, 60, 60, 8);
            this.p.ellipse(this.position.x, this.position.y, 5 * i, 5 * i);
        }
    };
    Particle.prototype.result = function () {
        return (this.position.x < -50 ||
            this.position.x > this.p.width + 50 ||
            this.position.y < -50 ||
            this.position.y > this.p.height + 50);
    };
    return Particle;
}());
var points;
var sketch1 = function (p) {
    p.setup = function () {
        var canvas = p.createCanvas(1, 1);
        canvas.parent('1');
        p.background(0);
        p.blendMode(p.ADD);
        this.isVisible = false;
        points = [];
    };
    p.draw = function () {
        if (!this.isVisible)
            return;
        // p.fill(255, 0.01)
        // p.blendMode(p.MULTIPLY)
        // p.rect(0, 0, p.width, p.height)
        p.blendMode(p.BLEND);
        p.clear();
        p.blendMode(p.ADD);
        // p.translate(-p.width/2, -p.height/2)
        // p.stroke(255)
        p.noStroke();
        p.fill(40, 30, 30, 255);
        var DIST = 100;
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
        if (p.frameCount % 2 === 0) {
            points.push(new Particle(p, p.createVector(p.mouseX, p.mouseY), p.createVector(Math.random() * 10 - 5, Math.random() * 10 - 5), p.createVector(0, 0)));
        }
        // points.forEach(point => {
        //   point.update()
        // }
        console.log(points.length);
        for (var i = points.length - 1; i >= 0; i--) {
            points[i].update();
            if (points[i].result() == true) {
                points.splice(i, 1);
            }
        }
    };
    p.keyPressed = function () {
        if (p.key == '1') {
            var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('1');
            p.background(0, 0);
            this.isVisible = true;
            points = [];
        }
        if (p.key == '0') {
            var canvas = p.createCanvas(1, 1);
            canvas.parent('1');
            p.background(0, 0);
            this.isVisible = false;
        }
    };
    p.mouseClicked = function () {
        points.push(new Particle(p, p.createVector(p.mouseX, p.mouseY), p.createVector(Math.random() * 10 - 5, Math.random() * 10 - 5), p.createVector(0, 0)));
    };
};
new p5(sketch1, '1');
//# sourceMappingURL=1.js.map