var Resource = function () {
  // タイトル画面画像
  this.titleImage = loadImage('Resource/title.png');

  // パズル画像
  this.puzzleImage = new Array();
  this.imageName = new Array();
  this.imageName.push('プロ生ちゃん_1');
  this.imageName.push('プロ生ちゃん_2');
  this.imageName.push('プロ生ちゃん_3');
  this.imageName.push('美雲このは_1');
  this.imageName.push('美雲このは_2');
  this.imageName.push('美雲このは_3');
  this.imageName.push('美雲あんず_1');
  this.imageName.push('美雲あんず_2');
  this.imageName.push('おきゅたん_1');
  this.imageName.push('おきゅたん_2');
  this.imageName.push('東北ずん子_1');
  this.imageName.push('東北イタコ_1');
  this.imageName.push('東北きりたん_1');

  this.puzzleImageNum = this.imageName.length;

  /*this.puzzleImage.push(loadImage('Resource/Pronama_00.png'));
  this.puzzleImage.push(loadImage('Resource/Pronama_01.png'));
  this.puzzleImage.push(loadImage('Resource/Pronama_02.png'));*/
  for (var i = 0; i < 3; i++){
    this.puzzleImage.push(loadImage('Resource/Pronama_0' + i + '.png'));
  }

  for (let i = 0; i < 3; i++){
    this.puzzleImage.push(loadImage('Resource/Conoha_0' + i + '.png'));
  }

  for (let i = 0; i < 2; i++) {
    this.puzzleImage.push(loadImage('Resource/Anzu_0' + i + '.png'));
  }

  for (let i = 0; i < 2; i++) {
    this.puzzleImage.push(loadImage('Resource/Ocutan_0' + i + '.png'));
  }

  for (let i = 0; i < 1; i++) {
    this.puzzleImage.push(loadImage('Resource/Zunko_0' + i + '.png'));
  }

  for (let i = 0; i < 1; i++) {
    this.puzzleImage.push(loadImage('Resource/Itako_0' + i + '.png'));
  }

  for (let i = 0; i < 1; i++) {
    this.puzzleImage.push(loadImage('Resource/Kiritan_0' + i + '.png'));
  }
}
