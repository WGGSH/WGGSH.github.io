"use strict";
var Solver = /** @class */ (function () {
    function Solver(cube) {
        this.firstCube = cube;
        this.virtualCube = new Cube();
        this.virtualCube.state = this.firstCube.state.copy();
        this.virtualState = this.virtualCube.state;
        this.solution = '';
        this.solutionCnt = 0;
        this.solve();
        // console.log(this.solution)
        // cube.scramble(this.solution, 0)
        // console.log(this.solutionCnt+'手');
        alert(this.solution);
    }
    Solver.prototype.virtualScramble = function (str) {
        var _this = this;
        var moveArray = str.split(' ');
        moveArray.forEach(function (element) {
            // console.log(MOVES18[element]);
            _this.virtualCube.moveNoTime(MOVES18[element]);
            _this.solutionCnt++;
        });
    };
    Solver.prototype.solutionScramble = function (str, end) {
        if (end === void 0) { end = false; }
        if (this.solution !== '')
            this.solution += ' ';
        this.virtualScramble(str);
        this.solution += str;
    };
    Solver.prototype.solve = function () {
        var _this = this;
        var bufScramble = '';
        // 第1フェーズ
        // 底面クロスを作る
        // B-R-B-O の順にエッジキューブを揃える
        var targetIndex = -1;
        var targetPosition = 8;
        var targetOrientation = -1;
        //  ----------  BY
        {
            targetIndex = -1;
            targetPosition = 8;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:10 & eo:0 が正着
            // 一旦ep:4に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("B'");
                    break;
                case 1:
                    this.solutionScramble('B');
                    break;
                case 2:
                    this.solutionScramble("R U' R'");
                    break;
                case 3:
                    this.solutionScramble("L' U L");
                    break;
                case 4:
                    break;
                case 5:
                    this.solutionScramble("U'");
                    break;
                case 6:
                    this.solutionScramble('U2');
                    break;
                case 7:
                    this.solutionScramble('U');
                    break;
                case 8:
                    this.solutionScramble('B2');
                    break;
                case 9:
                    this.solutionScramble("R2 U'");
                    break;
                case 10:
                    this.solutionScramble('F2 U2');
                    break;
                case 11:
                    this.solutionScramble('L2 U');
                    break;
            }
            // eo: 1なら修正
            if (this.virtualState.eo[4] == 1) {
                this.solutionScramble("B' R' U' R");
            }
            // 正位置に入れる
            this.solutionScramble('B2');
        }
        //  ----------  RY
        {
            targetIndex = -1;
            targetPosition = 9;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:9 & eo:0 が正着
            // 一旦ep:5に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("B' U B");
                    break;
                case 1:
                    this.solutionScramble("B U B'");
                    break;
                case 2:
                    this.solutionScramble("F' U' F");
                    break;
                case 3:
                    this.solutionScramble("F U' F'");
                    break;
                case 4:
                    this.solutionScramble('U');
                    break;
                case 5:
                    break;
                case 6:
                    this.solutionScramble("U'");
                    break;
                case 7:
                    this.solutionScramble('U2');
                    break;
                case 8:
                    this.solutionScramble('B2 U');
                    break;
                case 9:
                    this.solutionScramble('R2');
                    break;
                case 10:
                    this.solutionScramble("F2 U'");
                    break;
                case 11:
                    this.solutionScramble('L2 U2');
                    break;
            }
            // eo: 1なら修正
            if (this.virtualState.eo[5] == 1) {
                this.solutionScramble("F R' F' U'");
            }
            // 正位置に入れる
            this.solutionScramble('R2');
        }
        //  ----------  GY
        {
            targetIndex = -1;
            targetPosition = 10;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:10 & eo:0 が正着
            // 一旦ep:6に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("B' U2 B");
                    break;
                case 1:
                    this.solutionScramble("B U2 B'");
                    break;
                case 2:
                    this.solutionScramble("F'");
                    break;
                case 3:
                    this.solutionScramble('F');
                    break;
                case 4:
                    this.solutionScramble('U2');
                    break;
                case 5:
                    this.solutionScramble('U');
                    break;
                case 6:
                    break;
                case 7:
                    this.solutionScramble("U'");
                    break;
                case 8:
                    this.solutionScramble('B2 U2');
                    break;
                case 9:
                    this.solutionScramble('R2 U');
                    break;
                case 10:
                    this.solutionScramble('F2');
                    break;
                case 11:
                    this.solutionScramble("L2 U'");
                    break;
            }
            // eo: 1なら修正
            if (this.virtualState.eo[6] == 1) {
                this.solutionScramble("R' F R U");
            }
            // 正位置に入れる
            this.solutionScramble('F2');
        }
        //  ----------  OY
        {
            targetIndex = -1;
            targetPosition = 11;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:11 & eo:0 が正着
            // 一旦ep:7に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble('L');
                    break;
                case 1:
                    this.solutionScramble("B U' B'");
                    break;
                case 2:
                    this.solutionScramble("R U2 R'");
                    break;
                case 3:
                    this.solutionScramble("L'");
                    break;
                case 4:
                    this.solutionScramble("U'");
                    break;
                case 5:
                    this.solutionScramble('U2');
                    break;
                case 6:
                    this.solutionScramble("'");
                    break;
                case 7:
                    break;
                case 8:
                    this.solutionScramble("B2 U'");
                    break;
                case 9:
                    this.solutionScramble('R2 U2');
                    break;
                case 10:
                    this.solutionScramble('F2 U');
                    break;
                case 11:
                    this.solutionScramble('L2');
                    break;
            }
            // eo: 1なら修正
            if (this.virtualState.eo[7] == 1) {
                this.solutionScramble("F' L F U");
            }
            // 正位置に入れる
            this.solutionScramble('L2');
        }
        // ステップ2 底面コーナーキューブを揃える
        console.log('STEP2');
        //  ----------  YOB
        {
            targetIndex = -1;
            targetPosition = 4;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.cp.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.co[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:4 & eo:0 が正着
            // 一旦ep:0に移動
            switch (targetIndex) {
                case 0:
                    break;
                case 1:
                    this.solutionScramble("U'");
                    break;
                case 2:
                    this.solutionScramble('U2');
                    break;
                case 3:
                    this.solutionScramble('U');
                    break;
                case 4:
                    this.solutionScramble("L U' L'");
                    break;
                case 5:
                    this.solutionScramble("R' U R U'");
                    break;
                case 6:
                    this.solutionScramble("R U2 R'");
                    break;
                case 7:
                    this.solutionScramble("L' U' L U2");
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            console.log(this.virtualState.co[0]);
            switch (this.virtualState.co[0]) {
                case 0: // 一番長いやつ
                    this.solutionScramble("U L U2 L' U L U' L'");
                    break;
                case 2:
                    this.solutionScramble("U L U' L'");
                    break;
                case 1:
                    this.solutionScramble("U' B' U B");
                    break;
            }
        }
        //  ----------  YBR
        {
            targetIndex = -1;
            targetPosition = 5;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.cp.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.co[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:5 & eo:0 が正着
            // 一旦ep:1に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble('U');
                    break;
                case 1:
                    break;
                case 2:
                    this.solutionScramble("U'");
                    break;
                case 3:
                    this.solutionScramble('U2');
                    break;
                case 4:
                    this.solutionScramble("L U L'");
                    break;
                case 5:
                    this.solutionScramble("R' U' R U");
                    break;
                case 6:
                    this.solutionScramble("F' U' F");
                    break;
                case 7:
                    this.solutionScramble("L' U2 L");
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            console.log(this.virtualState.co[1]);
            switch (this.virtualState.co[1]) {
                case 0: // 一番長いやつ
                    this.solutionScramble("U B U2 B' U B U' B'");
                    break;
                case 2:
                    this.solutionScramble("U B U' B'");
                    break;
                case 1:
                    this.solutionScramble("U' R' U R");
                    break;
            }
        }
        //  ----------  YRG
        {
            targetIndex = -1;
            targetPosition = 6;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.cp.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.co[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:6 & eo:0 が正着
            // 一旦ep:1に移動2
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("U2");
                    break;
                case 1:
                    this.solutionScramble("U");
                    break;
                case 2:
                    break;
                case 3:
                    this.solutionScramble("U'");
                    break;
                case 4:
                    this.solutionScramble("B' U2 B");
                    break;
                case 5:
                    this.solutionScramble("B U B'");
                    break;
                case 6:
                    this.solutionScramble("R U' R'");
                    break;
                case 7:
                    this.solutionScramble("L' U' L");
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            console.log(this.virtualState.co[2]);
            switch (this.virtualState.co[2]) {
                case 0: // 一番長いやつ
                    this.solutionScramble("U R U2 R' U R U' R'");
                    break;
                case 2:
                    this.solutionScramble("U R U' R'");
                    break;
                case 1:
                    this.solutionScramble("U' F' U F");
                    break;
            }
        }
        //  ----------  YGO
        {
            targetIndex = -1;
            targetPosition = 7;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.cp.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.co[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:7 & eo:0 が正着
            // 一旦ep:3に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("U'");
                    break;
                case 1:
                    this.solutionScramble("U2");
                    break;
                case 2:
                    this.solutionScramble("U");
                    break;
                case 3:
                    break;
                case 4:
                    this.solutionScramble("B' L B");
                    break;
                case 5:
                    this.solutionScramble("R' U2 R");
                    break;
                case 6:
                    this.solutionScramble("R U R'");
                    break;
                case 7:
                    this.solutionScramble("L' U L");
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            console.log(this.virtualState.co[3]);
            switch (this.virtualState.co[3]) {
                case 0: // 一番長いやつ
                    this.solutionScramble("U F U2 F' U F U' F'");
                    break;
                case 2:
                    this.solutionScramble("U F U' F'");
                    break;
                case 1:
                    this.solutionScramble("U' L' U L");
                    break;
            }
        }
        // ステップ2 底面コーナーキューブを揃える
        console.log('STEP3');
        //  ----------  BO
        {
            targetIndex = -1;
            targetPosition = 0;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:0 & eo:0 が正着
            // 一旦ep:4に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("B' U B U L U' L' U'");
                    break;
                case 1:
                    this.solutionScramble("R' U R U B U' B' U2");
                    break;
                case 2:
                    this.solutionScramble("F' U F U R U' R' U");
                    break;
                case 3:
                    this.solutionScramble("L' U L U F U' F'");
                    break;
                case 4:
                    break;
                case 5:
                    this.solutionScramble("U'");
                    break;
                case 6:
                    this.solutionScramble("U2");
                    break;
                case 7:
                    this.solutionScramble("U");
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            if (this.virtualState.eo[4] == 0) {
                this.solutionScramble("U'");
                this.solutionScramble("U' B' U B U L U' L'");
            }
            else {
                this.solutionScramble("U L U' L' U' B' U B");
            }
        }
        //  ---------- BR
        {
            targetIndex = -1;
            targetPosition = 1;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:1 & eo:0 が正着
            // 一旦ep:5に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("B' U B U L U' L'");
                    break;
                case 1:
                    this.solutionScramble("R' U R U B U' B' U'");
                    break;
                case 2:
                    this.solutionScramble("F' U F U R U' R' U2");
                    break;
                case 3:
                    this.solutionScramble("L' U L U F U' F' U");
                    break;
                case 4:
                    this.solutionScramble("U");
                    break;
                case 5:
                    break;
                case 6:
                    this.solutionScramble("U'");
                    break;
                case 7:
                    this.solutionScramble("U2");
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            console.log(this.virtualState.eo[5]);
            if (this.virtualState.eo[5] == 1) {
                this.solutionScramble("U'");
                this.solutionScramble("U' R' U R U B U' B'");
            }
            else {
                this.solutionScramble("U B U' B' U' R' U R");
            }
        }
        //  ---------- GR
        {
            targetIndex = -1;
            targetPosition = 2;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:2 & eo:0 が正着
            // 一旦ep:6に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("B' U B U L U' L' U");
                    break;
                case 1:
                    this.solutionScramble("R' U R U B U' B'");
                    break;
                case 2:
                    this.solutionScramble("F' U F U R U' R' U'");
                    break;
                case 3:
                    this.solutionScramble("L' U L U F U' F' U2");
                    break;
                case 4:
                    this.solutionScramble("U2");
                    break;
                case 5:
                    this.solutionScramble("U");
                    break;
                case 6:
                    break;
                case 7:
                    this.solutionScramble("U'");
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            console.log(this.virtualState.eo[6]);
            if (this.virtualState.eo[6] == 0) {
                this.solutionScramble("U'");
                this.solutionScramble("U' F' U F U R U' R'");
            }
            else {
                this.solutionScramble("U R U' R' U' F' U F");
            }
        }
        //  ---------- GO
        {
            targetIndex = -1;
            targetPosition = 3;
            targetOrientation = -1;
            // 現在地を調べる
            this.virtualState.ep.forEach(function (element, index) {
                if (element === targetPosition) {
                    targetIndex = index;
                    targetOrientation = _this.virtualState.eo[index];
                }
            });
            console.log(targetIndex, targetOrientation);
            // ep:3 & eo:0 が正着
            // 一旦ep:7に移動
            switch (targetIndex) {
                case 0:
                    this.solutionScramble("B' U B U L U' L' U2");
                    break;
                case 1:
                    this.solutionScramble("R' U R U B U' B' U");
                    break;
                case 2:
                    this.solutionScramble("F' U F U R U' R'");
                    break;
                case 3:
                    this.solutionScramble("L' U L U F U' F' U'");
                    break;
                case 4:
                    this.solutionScramble("U'");
                    break;
                case 5:
                    this.solutionScramble("U2");
                    break;
                case 6:
                    this.solutionScramble("U");
                    break;
                case 7:
                    break;
            }
            // 位置修正完了
            // 向き毎に揃える
            console.log(this.virtualState.eo[7]);
            if (this.virtualState.eo[7] == 1) {
                this.solutionScramble("U'");
                this.solutionScramble("U' L' U L U F U' F'");
            }
            else {
                this.solutionScramble("U F U' F' U' L' U L");
            }
        }
        console.log('STEP4');
        {
            var step4State = 1;
            // 上段エッジの向きがあっている数を数える
            var correctNum = 0;
            for (var i = 4; i < 8; i++) {
                if (this.virtualState.eo[i] === 0) {
                    correctNum++;
                }
            }
            if (correctNum === 0) {
                step4State = 1;
            }
            else if (correctNum === 2) {
                // 向かい合う面が両方揃っているか確認
                step4State = 3;
                for (var i = 4; i < 6; i++) {
                    // console.log(i,i+2);
                    // console.log(this.virtualState.eo[i],this.virtualState.eo[i+2]);
                    if (this.virtualState.eo[i] === 0 && this.virtualState.eo[i + 2] === 0) {
                        step4State = 2;
                    }
                }
            }
            else if (correctNum === 4) {
                step4State = 4;
            }
            // console.log('step4State:'+step4State);
            // console.log(this.virtualState.eo);
            for (var i = step4State; i < 4; i++) {
                console.log('i"' + i);
                // CNT:2 なら向きの確認
                if (i === 2 && this.virtualState.eo[4] === 0) {
                    this.solutionScramble("U");
                }
                if (i === 3) {
                    var flag = (1 - this.virtualState.eo[4]) +
                        (1 - this.virtualState.eo[5]) * 2 +
                        (1 - this.virtualState.eo[6]) * 4 +
                        (1 - this.virtualState.eo[7]) * 8;
                    console.log('flag:' + flag);
                    if (flag === 5) {
                        console.log(this.virtualState.eo);
                    }
                    switch (flag) {
                        case 12:
                            this.solutionScramble("U");
                            break;
                        case 9:
                            // this.solutionScramble("U2");
                            break;
                        case 6:
                            this.solutionScramble("U2");
                            break;
                        case 3:
                            this.solutionScramble("U'");
                            break;
                    }
                }
                this.solutionScramble("R' U' F' U F R");
                if (i === 2) {
                    this.solutionScramble("U2");
                }
            }
        }
        console.log('STEP5');
        {
            // コーナーWBOを探す
            var cnt = 0;
            while (cnt++ < 4) {
                targetIndex = -1;
                targetPosition = 0;
                targetOrientation = -1;
                // 現在地を調べる
                this.virtualState.cp.forEach(function (element, index) {
                    if (element === targetPosition) {
                        targetIndex = index;
                        targetOrientation = _this.virtualState.co[index];
                    }
                });
                console.log(targetIndex, targetOrientation);
                // cp:0 の位置を合わせる
                switch (targetIndex) {
                    case 1:
                        this.solutionScramble("U'");
                        break;
                    case 2:
                        this.solutionScramble("U2");
                        break;
                    case 3:
                        this.solutionScramble("U");
                        break;
                }
                // cpが正着になっている組み合わせを調べる
                var flag = (this.virtualState.cp[0] == 0 ? 1 : 0) +
                    (this.virtualState.cp[1] == 1 ? 2 : 0) +
                    (this.virtualState.cp[2] == 2 ? 4 : 0) +
                    (this.virtualState.cp[3] == 3 ? 8 : 0);
                console.log('flag:' + flag);
                if (flag === 15) {
                    break;
                }
                switch (flag) {
                    case 1:
                        this.solutionScramble("L R' U L' U' R U L U' L'");
                        break;
                    case 3:
                        this.solutionScramble("U2 L R' U L' U' R U L U' L'");
                        break;
                    case 5:
                        this.solutionScramble("U L R' U L' U' R U L U' L'");
                        break;
                    case 9:
                        this.solutionScramble("U L R' U L' U' R U L U' L'");
                        break;
                }
            }
        }
        console.log('STEP6');
        {
            var cnt = 0;
            while (cnt++ < 6) {
                // 向きがあっているコーナーの数を調べる
                var flag = this.virtualState.co[0] == 0 ? 1 : 0 +
                    this.virtualState.co[1] == 0 ? 1 : 0 +
                    this.virtualState.co[2] == 0 ? 1 : 0 +
                    this.virtualState.co[3] == 0 ? 1 : 0;
                console.log(flag);
                switch (flag) {
                    case 0:
                        // this.solutionScramble("B U B' U B U2 B'")
                        break;
                    case 1:
                        // co==0の1つを探し，起点に持っていく
                        targetPosition = -1;
                        for (var i = 0; i < 4; i++) {
                            if (this.virtualState.co[i] === 0) {
                                targetPosition = i;
                            }
                        }
                        console.log('targetPosition:' + targetPosition);
                        switch (targetPosition) {
                            case 0:
                                this.solutionScramble("B U B' U B U2 B' U2");
                                break;
                            case 1:
                                // this.solutionScramble("U' B U B' U B U2 B' U")
                                break;
                            case 2:
                                // this.solutionScramble("U2 B U B' U B U2 B' U2")
                                break;
                            case 3:
                                this.solutionScramble("U B U B' U B U2 B' U2 U'");
                                break;
                        }
                        // this.solutionScramble("U B U B' U B U2 B'")
                        break;
                    case 2:
                        this.solutionScramble("U B U B' U B U2 B'");
                        break;
                    case 3:
                        break;
                    case 4:
                        cnt = 7;
                        break;
                }
            }
        }
        // 終了
    };
    return Solver;
}());
//# sourceMappingURL=solver.js.map