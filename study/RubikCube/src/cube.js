"use strict";
var State = /** @class */ (function () {
    function State(cp, co, ep, eo) {
        if (cp === void 0) { cp = []; }
        if (co === void 0) { co = []; }
        if (ep === void 0) { ep = []; }
        if (eo === void 0) { eo = []; }
        this.cp = cp;
        this.co = co;
        this.ep = ep;
        this.eo = eo;
    }
    State.prototype.copy = function () {
        var new_cp = new Array(8);
        var new_co = new Array(8);
        var new_ep = new Array(12);
        var new_eo = new Array(12);
        for (var i = 0; i < 8; i++) {
            new_cp[i] = this.cp[i];
            new_co[i] = this.co[i];
        }
        for (var i = 0; i < 12; i++) {
            new_ep[i] = this.ep[i];
            new_eo[i] = this.eo[i];
        }
        return new State(new_cp, new_co, new_ep, new_eo);
    };
    return State;
}());
var MOVES = {
    U: new State([3, 0, 1, 2, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    D: new State([0, 1, 2, 3, 5, 6, 7, 4], [0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    L: new State([4, 1, 2, 0, 7, 5, 6, 3], [2, 0, 0, 1, 1, 0, 0, 2], [11, 1, 2, 7, 4, 5, 6, 0, 8, 9, 10, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    R: new State([0, 2, 6, 3, 4, 1, 5, 7], [0, 1, 2, 0, 0, 2, 1, 0], [0, 5, 9, 3, 4, 2, 6, 7, 8, 1, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    F: new State([0, 1, 3, 7, 4, 5, 2, 6], [0, 0, 1, 2, 0, 0, 2, 1], [0, 1, 6, 10, 4, 5, 3, 7, 8, 9, 2, 11], [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0]),
    B: new State([1, 5, 2, 3, 0, 4, 6, 7], [1, 2, 0, 0, 2, 1, 0, 0], [4, 8, 2, 3, 1, 5, 6, 7, 0, 9, 10, 11], [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0])
};
var MOVES18;
var PositionCorner = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, 1, 1],
    [-1, 1, 1]
];
var PositionEdge = [
    [-1, 0, -1],
    [1, 0, -1],
    [1, 0, 1],
    [-1, 0, 1],
    [0, -1, -1],
    [1, -1, 0],
    [0, -1, 1],
    [-1, -1, 0],
    [0, 1, -1],
    [1, 1, 0],
    [0, 1, 1],
    [-1, 1, 0]
];
var CenterPosition = [
    [0, -1, 0, 1, -1],
    [0, 0, 1, 2, -1],
    [0, 1, 0, 1, 1],
    [0, 0, -1, 2, 1],
    [1, 0, 0, 0, -1],
    [-1, 0, 0, 0, 1]
];
var RotateCode = ['R', 'L', 'U', 'D', 'B', 'F'];
var RotateAxis = {
    R: function (position) { return position[0] == 1; },
    L: function (position) { return position[0] == -1; },
    U: function (position) { return position[1] == -1; },
    D: function (position) { return position[1] == 1; },
    B: function (position) { return position[2] == -1; },
    F: function (position) { return position[2] == 1; }
};
var RotateFlag = {
    R: [0, -1],
    L: [0, 1],
    U: [1, -1],
    D: [1, 1],
    B: [2, 1],
    F: [2, -1]
};
function getSpeed(code) {
    if (code[1] === undefined)
        return 1;
    if (code[1] === "'")
        return -1;
    if (code[1] === '2')
        return 2;
    return 1;
}
function cubeRotate(position) {
    var code = moveCode[0];
    if (code !== undefined) {
        if (RotateAxis[code](position)) {
            if (RotateFlag[code][0] == 0) {
                rotateX(((RotateFlag[code][1] * Math.PI) / 2 / moveMaxCnt) *
                    movingCnt *
                    getSpeed(moveCode));
            }
            if (RotateFlag[code][0] == 1) {
                rotateY(((RotateFlag[code][1] * Math.PI) / 2 / moveMaxCnt) *
                    movingCnt *
                    getSpeed(moveCode));
            }
            if (RotateFlag[code][0] == 2) {
                rotateZ(((RotateFlag[code][1] * Math.PI) / 2 / moveMaxCnt) *
                    movingCnt *
                    getSpeed(moveCode));
            }
        }
    }
}
var Cube = /** @class */ (function () {
    function Cube() {
        this.state = new State([0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        for (var i = 0; i < 8; i++) {
            this.state.cp[i] = i;
            this.state.co[i] = 0;
        }
        for (var i = 0; i < 12; i++) {
            this.state.ep[i] = i;
            this.state.eo[i] = 0;
        }
        // this.move(new State([0, 2, 6, 3, 4, 1, 5, 7],
        //   [0, 1, 2, 0, 0, 2, 1, 0],
        //   [0, 5, 9, 3, 4, 2, 6, 7, 8, 1, 10, 11],
        //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
        // this.move(MOVES.U);
        MOVES18 = new Object();
        // console.log(this.state);
        var keys = Object.keys(MOVES);
        for (var k in MOVES) {
            // console.log(k);
            MOVES18[k] = MOVES[k];
            var name_double = k + "2";
            var state_double = this.moveNoTime(MOVES[k]).moveNoTime(MOVES[k]);
            MOVES18[name_double] = state_double.state.copy();
            var name_dash = k + "'";
            var state_dash = this.moveNoTime(MOVES[k]);
            MOVES18[name_dash] = state_dash.state.copy();
            this.moveNoTime(MOVES[k]);
        }
        // console.log(MOVES18);
        // this.scramble("L D2 R U2 L F2 U2 L F2 R2 B2 R U' R' U2 F2 R' D B' F2");
        // this.scramble("D2 R2 B2 L2");
    }
    Cube.prototype.reset = function () {
        this.state = new State([0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    };
    Cube.prototype.scramble = function (str, cnt) {
        if (cnt === void 0) { cnt = 200; }
        var moveArray = str.split(' ');
        scrambleStartTime = new Date().getTime();
        scrambleMaxCnt = cnt;
        scrambleCode = moveArray;
        isScrambling = true;
        scrambleIndex = 0;
        // moveArray.forEach((element) => {
        //   // console.log(MOVES18[element]);
        //   this.move(MOVES18[element], 200);
        // });
        return this;
    };
    Cube.prototype.scrambleLoop = function () {
        if (isScrambling == false)
            return;
        isMoving = true;
        if (new Date().getTime() - scrambleStartTime >= scrambleMaxCnt) {
            // 1手進める
            // console.log(scrambleIndex, scrambleCode[scrambleIndex], MOVES18[scrambleCode[scrambleIndex]]);
            this.move(scrambleCode[scrambleIndex], MOVES18[scrambleCode[scrambleIndex]], scrambleMaxCnt, scrambleIndex != scrambleCode.length - 1);
            scrambleStartTime = new Date().getTime();
            scrambleIndex++;
            if (scrambleIndex == scrambleCode.length) {
                // スクランブル終了
                isScrambling = false;
                scrambleIndex = 0;
            }
        }
    };
    Cube.prototype.shuffle = function (count, speed) {
        if (count === void 0) { count = 30; }
        if (speed === void 0) { speed = 100; }
        var shuffleCode = '';
        var lastAxis = '';
        for (var i = 0; i < count; i++) {
            var axis = RotateCode[Math.floor(Math.random() * 6)];
            if (axis === lastAxis) {
                axis = RotateCode[Math.floor(Math.random() * 6)];
            }
            shuffleCode += axis;
            if (Math.random() > 0.5) {
                shuffleCode += "'";
            }
            if (i != count - 1) {
                shuffleCode += ' ';
            }
        }
        console.log('shuffle:  ' + shuffleCode);
        this.scramble(shuffleCode, speed);
    };
    Cube.prototype.moveNoTime = function (move) {
        var _this = this;
        isMoving = true;
        moveStartTime = new Date().getTime();
        var new_ep = new Array(12);
        var new_eo = new Array(12);
        var new_cp = new Array(8);
        var new_co = new Array(8);
        this.state.ep.forEach(function (element, index) {
            new_ep[index] = _this.state.ep[move.ep[index]];
        });
        this.state.eo.forEach(function (element, index) {
            new_eo[index] = (_this.state.eo[move.ep[index]] + move.eo[index]) % 2;
        });
        this.state.cp.forEach(function (element, index) {
            new_cp[index] = _this.state.cp[move.cp[index]];
        });
        this.state.co.forEach(function (element, index) {
            new_co[index] = (_this.state.co[move.cp[index]] + move.co[index]) % 3;
        });
        this.state.ep = new_ep;
        this.state.eo = new_eo;
        this.state.cp = new_cp;
        this.state.co = new_co;
        isMoving = false;
        moveCode = '';
        return this;
    };
    Cube.prototype.move = function (value, move, cnt, isScramble) {
        var _this = this;
        if (cnt === void 0) { cnt = 0; }
        if (isScramble === void 0) { isScramble = false; }
        moveCode = value;
        isMoving = true;
        moveStartTime = new Date().getTime();
        moveMaxCnt = cnt;
        setTimeout(function () {
            var new_ep = new Array(12);
            var new_eo = new Array(12);
            var new_cp = new Array(8);
            var new_co = new Array(8);
            _this.state.ep.forEach(function (element, index) {
                new_ep[index] = _this.state.ep[move.ep[index]];
            });
            _this.state.eo.forEach(function (element, index) {
                new_eo[index] = (_this.state.eo[move.ep[index]] + move.eo[index]) % 2;
            });
            _this.state.cp.forEach(function (element, index) {
                new_cp[index] = _this.state.cp[move.cp[index]];
            });
            _this.state.co.forEach(function (element, index) {
                new_co[index] = (_this.state.co[move.cp[index]] + move.co[index]) % 3;
            });
            _this.state.ep = new_ep;
            _this.state.eo = new_eo;
            _this.state.cp = new_cp;
            _this.state.co = new_co;
            moveStartTime = new Date().getTime();
            if (isScramble == false) {
                isMoving = false;
                moveCode = '';
            }
        }, cnt);
        return this;
    };
    Cube.prototype.drawPanel = function () {
        rect(-SIZE / 2, -SIZE / 2, SIZE, SIZE);
    };
    Cube.prototype.draw = function () {
        // console.log(isMoving);
        // if (isMoving) {
        //   console.log(moveCode);
        // }
        // console.log(moveCode);
        stroke(0);
        strokeWeight(15);
        // センターキューブの描画
        for (var i = 0; i < 4; i++) {
            push();
            cubeRotate(CenterPosition[i]);
            push();
            rotateX(radians(90));
            push();
            rotateX(radians(90 * i));
            translate(0, 0, SIZE * 1.5);
            fill(COLOR[i]);
            this.drawPanel();
            pop();
            pop();
            pop();
        }
        for (var i = 0; i < 2; i++) {
            push();
            cubeRotate(CenterPosition[i + 4]);
            push();
            rotateY(radians(-90));
            push();
            rotateY(radians(i * 180));
            translate(0, 0, SIZE * 1.5);
            fill(COLOR[4 + i]);
            this.drawPanel();
            pop();
            pop();
            pop();
        }
        // サブキューブの描画
        // 中段
        for (var j = 0; j < 4; j++) {
            push();
            cubeRotate(PositionEdge[j]);
            push();
            rotateY(-90 * radians(j));
            push();
            translate(SIZE * 1.5, 0, SIZE * 1.5);
            for (var i = 0; i < 2; i++) {
                push();
                rotateY(radians(90 * (i + 1)));
                translate(SIZE / 2, 0, 0);
                fill(COLOR[EdgeColor[this.state.ep[j]][this.state.eo[j] + (j % 2) == 1 ? i : 1 - i]]);
                // if (((j % 2 == 1) ? i : 1 - i) == 0) {
                //   box(SIZE / 2);
                // }
                this.drawPanel();
                pop();
            }
            pop();
            pop();
            pop();
        }
        // 上段
        for (var j = 0; j < 4; j++) {
            push();
            cubeRotate(PositionEdge[j + 4]);
            push();
            rotateY(-90 * radians(j + 1));
            push();
            translate(SIZE * 1, -SIZE * 1);
            fill(0);
            box(SIZE * 0.9);
            for (var i = 0; i < 2; i++) {
                push();
                rotateY(radians(-90));
                rotateX(radians(90 * (i + 1)));
                translate(0, 0, SIZE / 2);
                fill(COLOR[EdgeColor[this.state.ep[4 + j]][this.state.eo[4 + j] == 0 ? i : 1 - i]]);
                // if ((i) == 0) {
                //   box(SIZE / 2);
                // }
                this.drawPanel();
                pop();
            }
            pop();
            pop();
            pop();
        }
        // 下段
        for (var j = 0; j < 4; j++) {
            push();
            cubeRotate(PositionEdge[j + 8]);
            push();
            rotateY(-90 * radians(j + 1));
            push();
            translate(SIZE * 1, SIZE * 1);
            fill(0);
            box(SIZE * 0.9);
            for (var i = 0; i < 2; i++) {
                push();
                rotateY(radians(-90));
                rotateX(radians(-90 * (i + 1)));
                translate(0, 0, SIZE / 2);
                fill(COLOR[EdgeColor[this.state.ep[8 + j]][this.state.eo[8 + j] == 0 ? i : 1 - i]]);
                this.drawPanel();
                // if (i == 0) {
                //   box(SIZE / 2);
                // }
                pop();
            }
            pop();
            pop();
            pop();
        }
        // コーナーキューブ
        // 上段
        for (var i = 0; i < 4; i++) {
            push();
            cubeRotate(PositionCorner[i]);
            push();
            rotateY(radians(-90 * i));
            push();
            translate(SIZE, -SIZE, SIZE);
            fill(0);
            box(SIZE * 0.9);
            push();
            translate(0, -SIZE / 2, 0);
            rotateX(radians(90));
            fill(COLOR[CornerColor[this.state.cp[i]][(-this.state.co[i] + 3) % 3]]);
            this.drawPanel();
            pop();
            push();
            translate(SIZE / 2, 0, 0);
            rotateY(radians(90));
            fill(COLOR[CornerColor[this.state.cp[i]][(-this.state.co[i] + 4) % 3]]);
            this.drawPanel();
            pop();
            push();
            translate(0, 0, SIZE / 2);
            fill(COLOR[CornerColor[this.state.cp[i]][(-this.state.co[i] + 5) % 3]]);
            this.drawPanel();
            pop();
            pop();
            pop();
            pop();
        }
        // 下段
        for (var i = 0; i < 4; i++) {
            push();
            cubeRotate(PositionCorner[i + 4]);
            push();
            rotateY(radians(-90 * i));
            push();
            translate(SIZE, SIZE, SIZE);
            fill(0);
            box(SIZE * 0.9);
            push();
            translate(0, SIZE / 2, 0);
            rotateX(radians(90));
            fill(COLOR[CornerColor[this.state.cp[i + 4]][(-this.state.co[i + 4] + 3) % 3]]);
            this.drawPanel();
            pop();
            push();
            translate(SIZE / 2, 0, 0);
            rotateY(radians(90));
            fill(COLOR[CornerColor[this.state.cp[i + 4]][(-this.state.co[i + 4] + 5) % 3]]);
            this.drawPanel();
            pop();
            push();
            translate(0, 0, SIZE / 2);
            fill(COLOR[CornerColor[this.state.cp[i + 4]][(-this.state.co[i + 4] + 4) % 3]]);
            this.drawPanel();
            pop();
            pop();
            pop();
            pop();
        }
    };
    return Cube;
}());
//# sourceMappingURL=cube.js.map