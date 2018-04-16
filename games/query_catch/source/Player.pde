//自機
final float P_RANGE=50.0;
final float SPEED_MAX=20;
final float SPEED=16.0;
final float ACCEL_MAX=1.0;
final float ACCEL=1.0f;

//↓の一文を消すとJS側でTwitter連携に利用できるようになる
//int score;


class Player {
  Main main;
  GameMain gamemain;
  int state;//状態
  //int score;
  int state_count;//笑顔を続けるためのカウント
  PVector position;
  PVector velocity;
  PVector accel;
  
  int combo_count;
  int combo;
  
  //イニシャライズ
  Player(Main m, GameMain gm) {
    this.main=m;
    this.gamemain=gm;
    this.position=new PVector();
    this.velocity=new PVector();
    this.accel=new PVector();
    this.Initialize();
  }

  //初期化処理
  void Initialize() {
    this.position.set(width/2, height/2);
    this.velocity.set(0, 0);
    this.accel.set(0, 0);
    score=0.0;
    this.state=0;
    this.state_count=0;
    this.combo=0;
    this.combo_count=0;
  }

  //描画
  void Draw() {
    tint(255);
    image(this.main.image.game_main_player[this.state], 
      this.position.x-this.main.image.game_main_player[this.state].width/2, 
      this.position.y-this.main.image.game_main_player[this.state].height/2);
    stroke(120, 100, 100);
    noFill();
    //ellipse(this.position.x, this.position.y, 
     // P_RANGE, P_RANGE);
    fill(60, 100, 100,90);
    textSize(30);
    text("SCORE:"+(float)score/100, 0, 30);
    if(this.combo>=1){
      text("COMBO:"+this.combo,0,60);
    }
  }

  //キー入力
  void Input() {
    int move_x=0;
    int move_y=0;
    if (input.Get_Key(K_LEFT)>=1) {
      //this.velocity.x=-SPEED;
      this.accel.x=-ACCEL;
      move_x=-1;
    } else if (input.Get_Key(K_RIGHT)>=1) {
      //this.velocity.x=SPEED;
      this.accel.x=ACCEL;
      move_x=1;
    } else {
      //this.velocity.x=0;
      this.accel.x=0;
    }
    if (input.Get_Key(K_UP)>=1) {
      //this.velocity.y=-SPEED;
      this.accel.y=-ACCEL;
      move_y=-1;
    } else if (input.Get_Key(K_DOWN)>=1) {
      //this.velocity.y=SPEED;
      this.accel.y=ACCEL;
      move_y=1;
    } else {
      //this.velocity.y=0;
      this.accel.y=0;
    }

    if (move_x!=0 && move_y!=0) {
      //this.velocity.x/=sqrt(2);
      //this.velocity.y/=sqrt(2);
      this.accel.x/=sqrt(2);
      this.accel.y/=sqrt(2);
    }

    if (move_x==0 && move_y==0) {
      this.velocity.x*=0.8;
      this.velocity.y*=0.8;
    }

    if (move_x==-1 &&this.velocity.x>0 ||
      move_x==1 && this.velocity.x<0) {
      this.velocity.x*=0.6;
    }
    if (move_y==-1 &&this.velocity.y>0 ||
      move_y==1 && this.velocity.y<0) {
      this.velocity.y*=0.6;
    }
  }

  //移動処理
  void Move() {
    this.Input();
    this.velocity.add(this.accel);
    if (this.velocity.x>SPEED_MAX)this.velocity.x=SPEED_MAX;
    if (this.velocity.x<-SPEED_MAX)this.velocity.x=-SPEED_MAX;
    if (this.velocity.y>SPEED_MAX)this.velocity.y=SPEED_MAX;
    if (this.velocity.y<-SPEED_MAX)this.velocity.y=-SPEED_MAX;
    this.position.add(this.velocity);

    if (this.position.x<P_RANGE/2)this.position.x=P_RANGE/2;
    if (this.position.x>width-P_RANGE/2)this.position.x=width-P_RANGE/2;
    if (this.position.y<P_RANGE/2)this.position.y=P_RANGE/2;
    if (this.position.y>height-P_RANGE/2)this.position.y=height-P_RANGE/2;
  }


  //衝突判定
  void Collision() {
    for (Item it : this.gamemain.item_list) {
      if (sqrt(
        (this.position.x-it.position.x)*(this.position.x-it.position.x)+
        (this.position.y-it.position.y)*(this.position.y-it.position.y))
        <P_RANGE+ITEM_RANGE) {
        //当たった
        it.flag=1;
        //アイテムの種類によって判定を変える
        switch(it.state) {
        case 0://得点
          score+=100;
          score+=((this.combo*this.combo)>=900 ? 900 : (this.combo*this.combo));
          this.state=1;
          this.state_count=0;
          this.combo++;
          this.combo_count=0;
          break;
        case 1://毒
          this.state=2;
          this.main.Set_State(GAME_OVER);
          break;
        default:
          break;
        }
      }
    }
  }

  //アップデート
  void Update() {
    if(this.combo>=1){
      this.combo_count++;
      if(this.combo_count==45)this.combo=0;
    }
    
    this.Collision();
    
    if(this.main.state==GAME_OVER)this.state=2;
    if(this.state==1){
      this.state_count++;
      if(this.state_count==30){
        this.state=0;
      }
    }
    
    this.Move();
    this.Draw();
  }
}