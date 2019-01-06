// 横幅の比率に対する座標を取得
var widthScale = function (val) {
  return windowWidth* val;
}

// 縦幅の比率に対する座標を取得
var heightScale = function (val) {
  return windowHeight * val;
}

// ゼロ埋め
function zeroPadding(num, length) {
  return ('0000000000' + num).slice(-length);
}
