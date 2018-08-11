function setup(){
	createCanvas(windowWidth,windowHeight,WEBGL);
	//noLoop();
	colorMode(HSB,360,100,100);
}

function draw(){
	background(0);
	scale(0.5);
	rotateY(frameCount*0.02);
	rotateZ(frameCount*0.01);

	push();
	stroke(0,100,100);
	translate(-45,-180,-45);
	for(var j=0;j<120;j++){
		push();
		translate(0,15*j,0);
		for(var i=0;i<12;i++){
			fill((360/12*i+360/120*j+frameCount)%360,100,100);
			translate(90*cos(PI*2/12*i+PI/180*frameCount*j/50),0,90*sin(PI*2/12*i+PI/180*frameCount*j/50));
			push();
			//box(30);
			rect(0,0,25,25);
			pop();
		}
		pop();
	}
	pop();


}
