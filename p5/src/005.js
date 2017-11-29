var blockPosList = [];

function setup() {
	var canvas = createCanvas(windowWidth*0.97, windowHeight*1.5,WEBGL);
	canvas.parent("Back");
	//noLoop();
	colorMode(HSB, 360, 100, 100);
	
	// var blockPosList = [];
	for (var i = 0; i < 10; i++){
		blockPosList.push(createVector(random(-100,100),random(-100,100),random(-100,100)));
	}
	console.log(blockPosList);
}

function drawCube(size) {
	
	translate(-size/2, -size/2, -size/2);
	beginShape(LINES);
	for (var x = 0; x < 2; x++){
		for (var y = 0; y < 2; y++){
			vertex(x * size, y * size, 0);
			vertex(x * size, y * size, size);
		}
	}
	for (var x = 0; x < 2; x++){
		for (var z = 0; z < 2; z++){
			vertex(x * size, 0, z * size);
			vertex(x * size, size, z * size);
		}
	}
	for (var z = 0; z < 2; z++){
		for (var y = 0; y < 2; y++){
			vertex(0, y * size, z * size);
			vertex(size, y * size, z * size);
		}
	}
	endShape();
}

function draw(){
	background(0);
	//translate(width / 2, height / 2);

	rotateX(PI * 2 / 360 * mouseY);
	rotateY(PI * 2 / 360 * mouseX);
	
	stroke(255);
	fill(255);
	noFill();

	for (let pos of blockPosList) {
		push();
		translate(pos.x, pos.y, pos.z);
		drawCube(100);
		pop();
	}	

}
