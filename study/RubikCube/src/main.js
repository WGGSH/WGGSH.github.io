"use strict";
// / <reference path="p5.global-mode.d.ts" />
var SIZE = 100;
var COLOR;
var c;
var W = 0;
var G = 1;
var Y = 2;
var B = 3;
var R = 4;
var O = 5;
var CornerColor = [
    [W, O, B],
    [W, B, R],
    [W, R, G],
    [W, G, O],
    [Y, B, O],
    [Y, R, B],
    [Y, G, R],
    [Y, O, G]
];
var EdgeColor = [
    [B, O],
    [B, R],
    [G, R],
    [G, O],
    [W, B],
    [W, R],
    [W, G],
    [W, O],
    [Y, B],
    [Y, R],
    [Y, G],
    [Y, O]
];
var cube;
var isMoving = false;
var moveStartTime = 0;
var movingCnt = 0;
var moveMaxCnt = 0;
var moveCode = '';
var isScrambling = false;
var scrambleCode = [];
var scrambleStartTime = 0;
var scrambleMaxCnt = 0;
var scrambleIndex = 0;
isScrambling = false;
scrambleCode = [];
scrambleStartTime = 0;
scrambleMaxCnt = 0;
scrambleIndex = 0;
moveMaxCnt = 0;
isMoving = false;
moveStartTime = 0;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);
    cube = new Cube();
    COLOR = new Array();
    COLOR.push(color(255, 255, 255));
    COLOR.push(color(0, 255, 0));
    COLOR.push(color(255, 255, 0));
    COLOR.push(color(0, 0, 255));
    COLOR.push(color(255, 0, 0));
    COLOR.push(color(255, 128, 0));
    var resetButton = createButton('Reset');
    resetButton.position(30, 30);
    resetButton.mousePressed(function () {
        cube.reset();
    });
    var shuffleButton = createButton('Shuffle');
    shuffleButton.position(30, 60);
    shuffleButton.mousePressed(function () {
        cube.shuffle(30, 100);
    });
    var solveButton = createButton('solve(未完成)');
    solveButton.position(30, 90);
    solveButton.mousePressed(function () {
        new Solver(cube);
    });
    var scrambleInput = createInput();
    scrambleInput.position(30, 120);
    var scrambleButton = createButton('scramble');
    scrambleButton.position(scrambleInput.x + scrambleInput.width + 10, 120);
    scrambleButton.mousePressed(function () {
        cube.scramble(scrambleInput.value());
    });
}
function draw() {
    background(0);
    orbitControl(20, 20);
    if (isMoving) {
        movingCnt = new Date().getTime() - moveStartTime;
    }
    stroke(255, 0, 0);
    line(0, 0, 0, -1000, 0, 0);
    stroke(0, 255, 0);
    line(0, 0, 0, 0, -1000, 0);
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, -1000);
    stroke(64, 64, 64);
    cube.draw();
    cube.scrambleLoop();
    // translate(0, SIZE, SIZE * 1.5);
    // fill(COLOR[EdgeColor[cube.eo[0]][0]]);
    // rect(-SIZE / 2, -SIZE / 2, SIZE, SIZE);
    // rotateX(radians(90));
    // fill(COLOR[EdgeColor[cube.eo[0]][1]]);
    // rect(-SIZE / 2, -SIZE / 2, SIZE, SIZE);
}
function keyPressed() {
    // console.log(key);
    if (isMoving == true) {
        return;
    }
    var value = isUpperCase(key) ? key + "'" : key.toUpperCase();
    if (MOVES18[value]) {
        moveCode = value;
        cube.move(moveCode, MOVES18[value], 500);
        console.log(value);
    }
}
function isUpperCase(str) {
    return str === str.toUpperCase();
}
// const isUpperCase (str: string): boolean => {
//   return str === str.toUpperCase() ? true : false;
// }
//# sourceMappingURL=main.js.map