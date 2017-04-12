PShader sd;  //  シェーダ
 
void setup() {
  size(600, 600, P2D);
 
  //  フラグメントシェーダの読み込み
  sd = loadShader("FragmentShader.glsl");
}
 
void draw() {
  //  フラグメントシェーダのセット
  shader(sd);
 
  //  描画すると、フラグメントシェーダの内容で色がつく。
  rect(50, 50, width - 100, height - 100);
}
