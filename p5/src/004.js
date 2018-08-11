function setup(){
	createCanvas(600,600,WEBGL);
	colorMode(HSB,360,100,100);
}

function draw(){
	background(0);
	noStroke(0);

	rotateY(frameCount*0.02);
	rotateZ(frameCount*0.01);
	
	fill(0,100,100);
	stroke(0,100,100);
	var size=75;
	for (var i = 0; i < 2; ++i) {
		beginShape();
		vertex(-size,-size,(i*2-1)*size);
		vertex(size,-size,(i*2-1)*size);
		vertex(size,size,(i*2-1)*size);
		vertex(-size,size,(i*2-1)*size);
		endShape(CLOSE);
	}
	for (var i = 0; i < 2; ++i) {
		beginShape();
		vertex(-size,(i*2-1)*size,-size);
		vertex(size,(i*2-1)*size,-size);
		vertex(size,(i*2-1)*size,size);
		vertex(-size,(i*2-1)*size,size);
		endShape(CLOSE);
	}
	for (var i = 0; i < 2; ++i) {
		beginShape();
		vertex((i*2-1)*size,-size,-size);
		vertex((i*2-1)*size,size,-size);
		vertex((i*2-1)*size,size,size);
		vertex((i*2-1)*size,-size,size);
		endShape(CLOSE);
	}

}
