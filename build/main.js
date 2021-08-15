let isMobile, diameter, x, y;
let particles = [];
let nbSquare = 0;
let nbEllipse = 0;
let n = 0;

window.addEventListener('load', () => {
	let pi = document.querySelector("#pi");
	let iter = document.querySelector("#iter");
	let speed = document.querySelector("#slider");
	let lopper = setInterval(() => { createWatterDrop() }, Math.abs(speed.value));

	speed.oninput = () => {
		clearInterval(lopper);
		lopper = setInterval(() => { createWatterDrop() }, abs(speed.value));
	}
});

function setup() {
	rectMode(CENTER);

	let canevasDiv = document.querySelector('#canevas');
	let w = canevasDiv.clientWidth;
	let h = canevasDiv.clientHeight;
	let canevas = createCanvas(w, h);
	canevas.parent('canevas');

	particles = [];
	isMobile = (windowWidth < 768) ? true : false;
	diameter = isMobile ? width / 2 : width / 4;

	// for(let i = 0; i<10000 ; i++){
	// 	createWatterDrop();
	// }
}

function windowResized() {
	setup();
}

function draw() {
	// Background
	background('#264653');
	createFigure();

	// Watter Drop
	updateWatterDrop();
	updateDisplay()
}

class WatterDrop {
	constructor(x, y, insideFig) {
		this.x = x;
		this.y = y;
		this.insideFig = insideFig;
		this.show = true
		this.size = 5;
	}

	update() {
		if (this.size < 10) {
			this.size += 0.25;
		}
		else {
			if (this.insideFig) {
				return
			}
			else {
				this.show = false;
			}
		}
	}

	display() {
		fill('#2A9D8F');
		noStroke();
		ellipse(this.x, this.y, this.size);
	}
}

let createFigure = () => {
	fill(229, 231, 235); // gray-200
	strokeWeight(5);
	stroke('#E76F51');
	if (isMobile) {
		ellipse(
			0.5 * width,                         		// x
			0.75 * height,                 			// y
			diameter);                                 // r
		text(nbEllipse, 0.5 * width, 0.75 * height);
		
		rect(0.5 * width,                             // x
			0.25 * height,                            // y
			diameter);                                 // r 
		text(nbSquare, 0.5 * width, 0.25 * height);
	} else {
		ellipse(
			0.75 * width,                          	// x
			0.5 * height,                     		// y
			diameter);                                 // r
		text(nbEllipse, 0.75 * width, 0.5 * height);

		rect(0.25 * width,                            // x
			0.5 * height,                             // y
			diameter);                                 // r 
		text(nbSquare, 0.25 * width, 0.5 * height);
	}
}

let updateWatterDrop = () => {
	for (let i = 0; i < particles.length; i++) {
		if (particles[i].show) {
			particles[i].update();
			particles[i].display();
		}
		else {
			particles.splice(i, 1);
		}
	}
}

let updateDisplay = () => {
	pi.textContent = round(4 * nbEllipse / nbSquare, 10).toFixed(10);
	iter.textContent = n;
}

let createWatterDrop = () => {
	n++
	x = random(width);
	y = random(height);
	if (isMobile) {
		//In the square
		if (x > 0.5 * width - 0.5 * diameter 		// right 
			& x < 0.5 * width + 0.5 * diameter 		// left 
			& y < 0.25 * height + 0.5 * diameter	// bottom
			& y > 0.25 * height - 0.5 * diameter) {	// top
			nbSquare++;
			particles.push(new WatterDrop(x, y, false));
		}
		// In the ellipse
		else if (pow(x - 0.5 * width, 2) + pow(y - 0.75 * height, 2) < pow(0.5 * diameter, 2)) {
			nbEllipse++;
			particles.push(new WatterDrop(x, y, false));
		}
		else {
			particles.push(new WatterDrop(x, y, false));
		}
	}
	else {
		//In the square
		if (x > 0.25 * width - 0.5 * diameter 		// right 
			& x < 0.25 * width + 0.5 * diameter 	// left 
			& y < 0.5 * height + 0.5 * diameter		// bottom
			& y > 0.5 * height - 0.5 * diameter) {	// top
			nbSquare++;
			particles.push(new WatterDrop(x, y, false));
		}
		// In the ellipse
		else if (pow(x - 0.75 * width, 2) + pow(y - 0.5 * height, 2) < pow(0.5 * diameter, 2)) {
			nbEllipse++;
			particles.push(new WatterDrop(x, y, false));
		}
		else {
			particles.push(new WatterDrop(x, y, false));
		}
	}
}