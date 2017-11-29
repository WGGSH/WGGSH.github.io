//画像保存クラス
class Image{
  Main main;
  PImage title_bg;
  PImage game_bg;
  PImage[] game_main_player;
  PImage[] game_main_item;
  
  //イニシャライズ
  Image(Main m){
    this.main=m;
    this.title_bg=loadImage("image/title_background.png");
    this.game_bg=loadImage("image/game_background.png");
    this.game_main_player=new PImage[3];
    this.game_main_player[0]=loadImage("image/player_normal.png");
    this.game_main_player[1]=loadImage("image/player_smile.png");
    this.game_main_player[2]=loadImage("image/player_cry.png");
    this.game_main_item=new PImage[2];
    this.game_main_item[0]=loadImage("image/orange_good.png");
    this.game_main_item[1]=loadImage("image/orange_bad.png");
    
  }
  
}