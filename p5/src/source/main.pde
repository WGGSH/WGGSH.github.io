//クラス定数
final int TITLE=0;
final int GAME_MAIN=1;
final int GAME_OVER=2;

//メイン制御クラス
class Main {
  PFont font;//フォント形式
  int state;//ゲーム状態
  Image image;//画像
  Title title;//タイトル画面
  GameMain gamemain;//メインゲーム
  GameOver gameover;//ゲームオーバー

  //イニシャライズ
  Main() {
    this.image=new Image(this);
    this.title=new Title(this);
    this.gamemain=new GameMain(this);
    this.gameover=new GameOver(this, this.gamemain);

    this.state=TITLE;
    //this.state=GAME_OVER;
    this.font=createFont("Calisto MT Bold Italic", 20);
  }



  //描画系統の初期化
  void Draw_Setting() {
    background(0);
    colorMode(HSB, 360, 100, 100);
    stroke(0);
    strokeWeight(2);
    fill(0);
    textFont(this.font);
  }

  //状態変更関数
  void Set_State(int num) {
    this.state=num;
  }

  //アップデート処理
  void Update() {
    Draw_Setting();

    switch(this.state) {
    case TITLE:
      this.title.Update();
      break;
    case GAME_MAIN:
      this.gamemain.Update();
      break;
    case GAME_OVER:
      this.gameover.Update();
      break;
    default:
      break;
    }

    textSize(20);
    fill(60, 100, 100);
    text((int)frameRate, 0, height-10);
  }
}