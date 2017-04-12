function setup(){
	createCanvas(600,600,WEBGL);
}

var sd=loadShader("FragmentShader.glsl");
function draw(){
	// フラグメントシェーダのセット
	shader(sd);

	// 描画すると,フラグメントシェーダの内容で色がつく
	rect(50,50,width-100,height-100);

}
