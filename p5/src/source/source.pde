Main main;

//初期化
void setup() {
  size(600, 600);
  colorMode(HSB, 360, 100, 100,100);
  frameRate(30);

  //クラス初期化
  main=new Main();
}

//メインループ
void draw() {
  main.Update();
  //println(input.keycount);
}