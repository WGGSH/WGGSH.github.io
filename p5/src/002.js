function setup(){
	createCanvas(640,480,WEBGL);
	//noLoop();
	//colorMode(HSB,360,100,100);
}

const DETAIL=20;
function draw(){
	background(0);
	scale(1);
	rotateX(PI/180*mouseY);
	rotateY(PI/180*mouseX);

	push();
	translate(-10*DETAIL/2,-10*DETAIL/2,-10*DETAIL/2);
	noStroke()
	for (var x = 0; x < DETAIL; ++x) {
		push();
		translate(x*10,0,0);
		for (var y = 0; y < DETAIL; ++y) {
			push();
			translate(0,y*10,0);
			for (var z = 0; z < DETAIL; ++z) {
				push();
				translate(0,0,z*10);
				
				fill(255/DETAIL*x,255/DETAIL*y,255/DETAIL*z);
				box(10);
				
				pop();
			}
			pop();
		}
		pop();
	}
	pop();


}
