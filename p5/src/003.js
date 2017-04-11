function setup(){
	createCanvas(640,480,WEBGL);
	//noLoop();
	colorMode(HSB,360,100,100);
}

const DETAIL=60;
const SIZE=120;
function draw(){
	background(0);
	scale(1);
	rotateX(PI*2/DETAIL*mouseY);
	rotateY(PI*2/DETAIL*mouseX);

	push();
	
	stroke(255);
	for (var i = 0; i <DETAIL; ++i) {
		beginShape();
			fill(360/DETAIL*i,100,100);
			vertex(SIZE*cos(PI*2/DETAIL*i),SIZE*sin(PI*2/DETAIL*i),0);
			fill(360/DETAIL*i,100,0);
			vertex(SIZE*cos(PI*2/DETAIL*i),SIZE*sin(PI*2/DETAIL*i),SIZE);
			fill(360/DETAIL*(i+1),100,100);
			vertex(SIZE*cos(PI*2/DETAIL*(i+1)),SIZE*sin(PI*2/DETAIL*(i+1)),0);
		endShape(CLOSE);
		beginShape();
			fill(360/DETAIL*(i+1),100,0);
			vertex(SIZE*cos(PI*2/DETAIL*(i+1)),SIZE*sin(PI*2/DETAIL*(i+1)),SIZE);
			fill(360/DETAIL*i,100,0);
			vertex(SIZE*cos(PI*2/DETAIL*i),SIZE*sin(PI*2/DETAIL*i),SIZE);
			fill(360/DETAIL*(i+1),100,100);
			vertex(SIZE*cos(PI*2/DETAIL*(i+1)),SIZE*sin(PI*2/DETAIL*(i+1)),0);
		endShape(CLOSE);
	}

	pop();

}
