
//アイテム
//取ると点が増えたり,ゲームオーバーにいなったりする
final float ITEM_RANGE=0.0;
final int ITEM_MAX=40;
final int ITEM_GOOD_MAX=30;
final int ITEM_BAD_MAX=10;
final float ITEM_SPEED_MAX=13.0;
final float ITEM_DIR_RANGE=100.0;

class Item {
  Main main;
  GameMain gamemain;
  int state;//アイテムの種類
  int flag;//消滅するかどうかのフラグ
  PVector position;//座標
  PVector velocity;//移動量

  //イニシャライズ①
  //画面外から真ん中付近に飛ぶ
  Item(Main m, GameMain gm,int state,float speed) {
    this.main=m;
    this.gamemain=gm;
    this.state=state;
    this.position=new PVector();
    this.velocity=new PVector();
    this.Setting(speed);
  }

  //イニシャライズ②
  //指定の場所から指定の方向に飛ぶ
  Item(Main m, GameMain gm,int state,
    PVector pos, PVector vec,float speed) {
    this.main=m;
    this.gamemain=gm;
    this.state=state;
    this.position=new PVector();
    this.position.set(pos.x,pos.y);
    this.velocity=new PVector();
    this.velocity.set(vec.x,vec.y);
    float length=sqrt(
    this.velocity.x*this.velocity.x+
    this.velocity.y*this.velocity.y);
    this.velocity.x/=length;
    this.velocity.y/=length;
    //this.velocity.normalize();
    this.velocity.mult(speed);
    this.flag=0;
  }
  
  void Initialize(){
    this.Setting(1.0);
    this.flag=0;
  }

  //軌道設定
  void Setting(float speed) {
    float angle1=random(0, PI*2);
    float angle2=random(0, PI*2);
    float range=random(0, ITEM_DIR_RANGE);
    this.position.set(
      width/2+width/2*sqrt(2)*cos(angle1), 
      width/2+width/2*sqrt(2)*sin(angle1));
    PVector dir=new PVector();
    dir.set(
      width/2+range*cos(angle2), 
      width/2+range*sin(angle2));
    this.velocity.x=dir.x-this.position.x;
    this.velocity.y=dir.y-this.position.y;
    this.velocity.normalize();
    this.velocity.mult(speed);
  }

  //描画
  void Draw() {
    tint(255);
    image(this.main.image.game_main_item[this.state], 
      this.position.x-this.main.image.game_main_item[this.state].width/2, 
      this.position.y-this.main.image.game_main_item[this.state].height/2);
  }

  //移動
  void Move() {
    this.position.add(this.velocity);
  }

  void OutofBorder() {
    if (sqrt(
      (this.position.x-width/2)*(this.position.x-width/2)+
      (this.position.y-width/2)*(this.position.y-width/2))>
      width*sqrt(2)+ITEM_RANGE){
        //return 1;
        this.flag=1;
      }
  }

  //アップデート
  //返値
  //0:正常
  //1:消滅
  int Update() {
    this.Move();
    this.Draw();
    
    this.OutofBorder();
    return this.flag;
  }

}