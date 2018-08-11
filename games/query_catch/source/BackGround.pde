//背景クラス

class BackGround{
  Main main;
  GameMain gamemain;
  
  BackGround(Main m,GameMain gm){
    this.main=m;
    this.gamemain=gm;
  }
  
  //描画
  void Draw(){
    tint(255);
    image(this.main.image.game_bg,0,0);
    /*noFill();
    stroke(this.gamemain.game_count%360,100,100,70);
    strokeWeight((this.gamemain.game_count%120)/2.0);
    ellipse(width/2,height/2,
    width/2*sqrt(2)/30.0*(this.gamemain.game_count%120),
    width/2*sqrt(2)/30.0*(this.gamemain.game_count%120));
    
    stroke((this.gamemain.game_count*1.2)%360,100,100,70);
    strokeWeight((this.gamemain.game_count%160)/2.0);
    ellipse(width/2,height/2,
    width/2*sqrt(2)/25.0*(this.gamemain.game_count%160),
    width/2*sqrt(2)/25.0*(this.gamemain.game_count%160));
    
    stroke((this.gamemain.game_count*0.8)%360,100,100,70);
    strokeWeight((this.gamemain.game_count%85)/2.0);
    ellipse(width/2,height/2,
    width/2*sqrt(2)/20.0*(this.gamemain.game_count%85),
    width/2*sqrt(2)/20.0*(this.gamemain.game_count%85));*/
  }

  //アップデート
  void Update(){
    this.Draw();
  }
  
}