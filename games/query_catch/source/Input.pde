//キー入力統括
final int KEY_MAX=6;
//使用するキーは
//Z,←↑→↓の5つ
final int K_LEFT=0;
final int K_UP=1;
final int K_RIGHT=2;
final int K_DOWN=3;
final int K_Z=4;
final int K_X=5;

class Input {
  Main main;

  int[] keycount;

  //イニシャライズ
  Input() {
    this.keycount=new int[KEY_MAX];
    for (int i=0; i<KEY_MAX; i++) {
      this.keycount[i]=0;
    }
  }

  //キー状態の取得
  int Get_Key(int number) {
    return this.keycount[number];
  }
}

Input input=new Input();

//キーが押されたとき
void keyPressed() {
  if (key==CODED) {
    switch(keyCode) {
    case LEFT:
      input.keycount[K_LEFT]++;
      break;
    case UP:
      input.keycount[K_UP]++;
      break;
    case RIGHT:
      input.keycount[K_RIGHT]++;
      break;
    case DOWN:
      input.keycount[K_DOWN]++;
      break;
    default:
      break;
    }
  }
  switch(key) {
  case 'z':
  case 'Z':
    input.keycount[K_Z]++;
    break;
  case 'x':
  case 'X':
    input.keycount[K_X]++;
    break;
  default:
    break;
  }
}

//キーが離されたとき
void keyReleased() {
  if (key==CODED) {
    switch(keyCode) {
    case LEFT:
      input.keycount[K_LEFT]=0;
      break;
    case UP:
      input.keycount[K_UP]=0;
      break;
    case RIGHT:
      input.keycount[K_RIGHT]=0;
      break;
    case DOWN:
      input.keycount[K_DOWN]=0;
      break;
    default:
      break;
    }
  }
  switch(key) {
  case 'z':
  case 'Z':
    input.keycount[K_Z]=0;
    break;
  case 'x':
  case 'X':
    input.keycount[K_X]=0;
    break;
  default:
    break;
  }
}