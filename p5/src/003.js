function setup(){
	//createCanvas(640,480,WEBGL);
	createCanvas(windowWidth,windowHeight,WEBGL);
	//noLoop();
	//colorMode(HSB,360,100,100);
	colorMode(RGB,255,255,255);
}

function setVertex(x,y,z){
	fill(x==0 ?0:255, y==0 ?0:255,z==0 ?0:255);
	vertex(x,y,z);
}

const DETAIL=60;
const SIZE=120;
function draw(){
	background(0);
	scale(2);
	rotateX(PI*2/DETAIL*mouseY);
	rotateY(PI*2/DETAIL*mouseX);

	push();
	
	translate(-SIZE/2,-SIZE/2,-SIZE/2);
	stroke(255);
	for (var i = 0; i < 2; ++i) {
		beginShape();
			setVertex(i*SIZE,0,0);
			setVertex(i*SIZE,SIZE,0);
			setVertex(i*SIZE,SIZE,SIZE);
			setVertex(i*SIZE,0,SIZE);
		endShape(CLOSE);	
	}
	for (var i = 0; i < 2; ++i) {
		beginShape();
			setVertex(0,i*SIZE,0);
			setVertex(SIZE,i*SIZE,0);
			setVertex(SIZE,i*SIZE,SIZE);
			setVertex(0,i*SIZE,SIZE);
		endShape(CLOSE);	
	}
	for (var i = 0; i < 2; ++i) {
		beginShape();
			setVertex(0,0,i*SIZE);
			setVertex(SIZE,0,i*SIZE);
			setVertex(SIZE,SIZE,i*SIZE);
			setVertex(0,SIZE,i*SIZE);
		endShape(CLOSE);	
	}

	pop();

}
