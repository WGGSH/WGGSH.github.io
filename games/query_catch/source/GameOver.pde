class GameOver{
  Main main;
  GameMain gamemain;
  
  //イニシャライズ
  GameOver(Main m,GameMain gm){
    this.main=m;
    this.gamemain=gm;
  }
  
  //初期化
  void Initialize(){
  }
  
  //描画
  void Draw(){
    //ゲーム画面の描画
    this.gamemain.background.Draw();
    for(Item it:this.gamemain.item_list){
      it.Draw();
    }
    this.gamemain.player.Draw();
    
    //画面を暗くする
    fill(0,0,0,50);
    stroke(0,0,0,50);
    rect(0,0,width,height);
    
    textSize(60);
    fill(0,100,100);
    text("GAME OVER",120,150);
    
  }
  
  //アップデート
  void Update(){
    this.Draw();
    
    //キー入力
    if(input.Get_Key(K_X)>=1){
      this.main.Set_State(TITLE);
    }
  }
  
}