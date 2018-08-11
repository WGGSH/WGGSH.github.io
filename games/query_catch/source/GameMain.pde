class GameMain {
  BackGround background;
  Main main;
  Player player;
  ArrayList<Item> item_list;
  int item_good_num;
  int item_bad_num;
  float item_speed;
  int game_count;

  //イニシャライズ
  GameMain(Main m) {
    this.main=m;
    this.background=new BackGround(this.main,this);
    this.player=new Player(this.main, this);
    //this.item=new Item(this.main,this,1);
    this.item_list=new ArrayList<Item>();
    this.Initialize();
  }

  //初期化処理
  void Initialize() {
    this.player.Initialize();
    //this.item.Initialize();
    this.item_list.clear();
    this.item_good_num=5;
    this.item_bad_num=1;
    this.item_speed=1.0f;
    this.game_count=0;
    for (int i=0; i<this.item_good_num; i++) {
      this.item_list.add(new Item(
        this.main, this, 0, this.item_speed));
    }
    for (int i=0; i<this.item_bad_num; i++) {
      this.item_list.add(new Item(
        this.main, this, 1, this.item_speed));
    }
  }

  void Add_Item() {
    int good_num=0;
    int bad_num=0;
    for (Item it : this.item_list) {
      if (it.state==0)good_num++;
      if (it.state==1)bad_num++;
    }

    //不足分追加
    if (good_num<this.item_good_num) {
      for (int i=0; i<this.item_good_num-good_num; i++) {
        this.item_list.add(new Item(
          this.main, this, 0, this.item_speed));
      }
    }
    if (bad_num<this.item_bad_num) {
      for (int i=0; i<this.item_bad_num-bad_num; i++) {
        this.item_list.add(new Item(
          this.main, this, 1, this.item_speed));
      }
    }

    //奇襲
    if (this.game_count%900==890) {
      //println("shoot");
      this.item_bad_num++;
      float angle;
      PVector pos=new PVector();
      PVector dir=new PVector();
      angle=random(0, PI*2);
      pos.set(
        width/2+width/2*sqrt(2)*cos(angle), 
        width/2+width/2*sqrt(2)*sin(angle));
      dir.set(
        this.player.position.x, 
        this.player.position.y);
      dir.sub(pos);
      this.item_list.add(new Item(
        this.main, this, 1, pos, dir, this.item_speed*1.3));
    }

    //ボーナス
    if (this.game_count%1800==1790) {
      PVector pos=new PVector();
      PVector dir=new PVector();
      for (int i=0; i<16; i++) {
        pos.set(
          width/2+width/2*sqrt(2)*cos(PI*2/16*i), 
          width/2+width/2*sqrt(2)*sin(PI*2/16*i));
        dir.set(
          width/2+60*cos(PI*2/16*(i+4)), 
          width/2+60*sin(PI*2/16*(i+4)));
        dir.x-=pos.x;
        dir.y-=pos.y;
        this.item_list.add(new Item(
          this.main, this, 0, pos, dir, item_speed*1.5));
      }
    }
    
    //良いみかんの追加
    if(this.game_count%600==590){
      this.item_good_num++;
    }
  }

  //アップデート
  void Update() {
    this.game_count++;
    this.item_speed=1.0+game_count/30.0/20.0;
    if (this.item_speed>ITEM_SPEED_MAX)this.item_speed=ITEM_SPEED_MAX;

    //背景の更新
    this.background.Update();

    this.player.Update();
    int size=this.item_list.size();
    for (int i=size-1; i>=0; i--) {
      if (this.item_list.get(i).Update()==1) {
        this.item_list.remove(i);
      }
    }
    for (Item it : this.item_list) {
      if (it.state==1) {
        it.Draw();
      }
    }

    //アイテムの補充
    this.Add_Item();

    //タイトルに戻る処理
    if (input.Get_Key(K_X)>=1) {
      this.main.Set_State(TITLE);
      //this.main.Set_State(GAME_OVER);
    }
  }
}