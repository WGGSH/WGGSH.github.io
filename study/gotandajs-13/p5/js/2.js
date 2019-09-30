/// <reference path="p5.global-mode.d.ts" />
var sketch2 = function (p) {
    p.setup = function () {
        var canvas = p.createCanvas(1, 1, p.WEBGL);
        canvas.parent('2');
        p.background(0, 0);
    };
    var isVisible = false;
    p.draw = function () {
        p.orbitControl(10, 10);
        p.background(0, 0);
        // translate(-width / 2, -height / 2)
        // if (!isVisible) return
        // p.stroke(200)
        // p.strokeWeight(15)
        // p.noFill()
        p.noStroke();
        p.fill(0, 255, 0, 128);
        var NUM = 10;
        // for (let x = 0; x < NUM; x++) {
        //   for (let y = 0; y < NUM; y++) {
        //     for (let z = 0; z < NUM; z++) {
        //       p.push()
        //       p.fill(255/NUM*x,255/NUM*y,255/NUM*z,128)
        //       p.translate(50 * (x - NUM/2), 50 * (y - NUM/2), 50*(z-NUM/2))
        //       p.box(50)
        //       p.pop()
        //     }
        //   }
        // }
        var SIZE = 500;
        var ALPHA = 255;
        p.translate(-250, -250, -250);
        p.beginShape();
        p.fill(0, 0, 0, ALPHA);
        p.vertex(0, 0, 0);
        p.fill(0, 255, 0, ALPHA);
        p.vertex(0, SIZE, 0);
        p.fill(255, 255, 0, ALPHA);
        p.vertex(SIZE, SIZE, 0);
        p.fill(255, 0, 0, ALPHA);
        p.vertex(SIZE, 0, 0);
        p.endShape();
        p.beginShape();
        p.fill(0, 0, 255, ALPHA);
        p.vertex(0, 0, SIZE);
        p.fill(0, 255, 255, ALPHA);
        p.vertex(0, SIZE, SIZE);
        p.fill(255, 255, 255, ALPHA);
        p.vertex(SIZE, SIZE, SIZE);
        p.fill(255, 0, 255, ALPHA);
        p.vertex(SIZE, 0, SIZE);
        p.endShape();
        p.beginShape();
        p.fill(0, 0, 0, ALPHA);
        p.vertex(0, 0, 0);
        p.fill(0, 255, 0, ALPHA);
        p.vertex(0, SIZE, 0);
        p.fill(0, 255, 255, ALPHA);
        p.vertex(0, SIZE, SIZE);
        p.fill(0, 0, 255, ALPHA);
        p.vertex(0, 0, SIZE);
        p.endShape();
        p.beginShape();
        p.fill(255, 0, 0, ALPHA);
        p.vertex(SIZE, 0, 0);
        p.fill(255, 255, 0, ALPHA);
        p.vertex(SIZE, SIZE, 0);
        p.fill(255, 255, 255, ALPHA);
        p.vertex(SIZE, SIZE, SIZE);
        p.fill(255, 0, 255, ALPHA);
        p.vertex(SIZE, 0, SIZE);
        p.endShape();
        p.beginShape();
        p.fill(0, 0, 0, ALPHA);
        p.vertex(0, 0, 0);
        p.fill(0, 0, 255, ALPHA);
        p.vertex(0, 0, SIZE);
        p.fill(255, 0, 255, ALPHA);
        p.vertex(SIZE, 0, SIZE);
        p.fill(255, 0, 0, ALPHA);
        p.vertex(SIZE, 0, 0);
        p.endShape();
        p.beginShape();
        p.fill(0, 255, 0, ALPHA);
        p.vertex(0, SIZE, 0);
        p.fill(0, 255, 255, ALPHA);
        p.vertex(0, SIZE, SIZE);
        p.fill(255, 255, 255, ALPHA);
        p.vertex(SIZE, SIZE, SIZE);
        p.fill(255, 255, 0, ALPHA);
        p.vertex(SIZE, SIZE, 0);
        p.endShape();
    };
    p.keyPressed = function () {
        if (p.key == '2') {
            var canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
            canvas.parent('2');
            p.background(0, 0);
        }
        if (p.key == 'q') {
            var canvas = p.createCanvas(1, 1, p.WEBGL);
            canvas.parent('2');
            p.background(0, 0);
        }
    };
};
new p5(sketch2, '2');
//# sourceMappingURL=2.js.map