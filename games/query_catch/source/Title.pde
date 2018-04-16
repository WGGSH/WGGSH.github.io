//タイトル画面クラス
class Title {
  Main main;//メインクラスへの参照

  //イニシャライズ
  Title(Main m) {
    this.main=m;
  }

  //描画
  void Draw() {
    tint(255, 128);
    image(this.main.image.title_bg, 0, 0);
    fill(60, 100, 100);
    textSize(30);
    text("くえりんキャッチ!", 50, 100);
    text("操作方法", 50, 250);
    text("Z:ゲームスタート", 50, 300);
    text("X:タイトルに戻る", 50, 350);
    //text("X:
    text("←↑→↓:移動", 50, 400);
    
    text("スコア:"+score/100.0,width-200,height-10);
  }


  //アップデート
  void Update() {
    this.Draw();
    if (input.Get_Key(K_Z)==1) {
      this.main.Set_State(GAME_MAIN);
      this.main.gamemain.Initialize();
    }
  }
}