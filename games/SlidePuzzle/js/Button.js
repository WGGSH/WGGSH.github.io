var Button = function (_x, _y, _width, _height, _text, _func,_val,_fontSize) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.height = _height;
  this.text = _text;
  this.func = _func;

  var clickFlag;

  this.setup = function () {
    this.clickFlag = false;
  }


  this.update = function () {

    if (game.input.isMouseClicked) {
      console.log("clicked");
      // クリック箇所がボタンの範囲内に有るかチェック
      if (mouseX >= this.x && mouseX < this.x + this.width &&
        mouseY >= this.y && mouseY < this.y + this.height) {
        this.clickFlag = true;
      }
    }
    if (game.input.isMouseReleased) {
      // クリック箇所が範囲内にあるか調べる
      if (mouseX >= this.x && mouseX < this.x + this.width &&
        mouseY >= this.y && mouseY < this.y + this.height) {
        if (this.clickFlag == true) {
          // ボタンがクリックされたと認識
          this.func(_val);
          stroke(255, 0, 0);
          this.clickFlag = false;
        }
      } else {
        this.clickFlag = false;
      }
    }
  }

  this.draw = function () {
    if (this.clickFlag == true) {
      fill(255 * 0.8);
    } else {
      fill(255);
    }
    stroke(0);
    rect(this.x, this.y, this.width, this.height);

    fill(0, 0, 0);
    stroke(0, 0, 0);
    textSize(_fontSize);
    var offsetX = textWidth(this.text) / 2;
    var offsetY = textAscent()*1.5;
    text(this.text, this.x + this.width / 2 - offsetX, this.y + offsetY);
  }
}
