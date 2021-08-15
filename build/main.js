let isMobile, diameter, x, y;
let particles = [];
let nbSquare = 0;
let nbEllipse = 0;
let n = 0;

window.addEventListener('load', () => {
	let pi = document.querySelector("#pi");
	let iter = document.querySelector("#iter");
	let nbInput = document.querySelector("#nbInput");
	let nbInputButton = document.querySelector("#nbInputButton");

	let speed = document.querySelector("#slider");
	let lopper = setInterval(() => { createWatterDrop(true) }, Math.abs(Number(speed.value)));

	// add more ieration withour displaying them (too lagy)
	nbInput.value = 1000;
	nbInputButton.onclick = () => {
		let add = Number(nbInput.value);
		if((typeof add) == "number"){
			for(let i = 0; i<nbInput.value ; i++){
				createWatterDrop(false);
			}
		}
	};

	// speed range selector modifie the animation speed with a set interval
	speed.oninput = () => {
		clearInterval(lopper);
		lopper = setInterval(() => { createWatterDrop(true) }, abs(speed.value));
	};
});

function windowResized() {
	setup();
}
function setup() {
	rectMode(CENTER);

	//create canvas with the size of screen (= size of body)
	let canevasDiv = document.querySelector('#canevas');
	let w = canevasDiv.clientWidth;
	let h = canevasDiv.clientHeight;
	let canevas = createCanvas(w, h);
	canevas.parent('canevas');

	// Prepare variable for responsive design
	isMobile = (windowWidth < 768) ? true : false;
	diameter = isMobile ? width / 2 : width / 4;
}



function draw() {
	background('#264653'); 	//reset canvas
	createFigure();			// create fixed figure

	// animation of water drop
	updateWatterDrop();
	updateDisplay()
}

class WatterDrop {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 5;
	}

	// fonctions used for animation
	update() {
		this.size += 0.25;
	}

	display() {
		fill('#2A9D8F');
		noStroke();
		ellipse(this.x, this.y, this.size);
	}
}

let createFigure = () => {
	// create the square and the circle + the text inside them 

	fill(229, 231, 235); // gray-200
	strokeWeight(5);
	stroke('#E76F51');

	// responsive positionning
	if (isMobile) {
		ellipse(
			0.5 * width,                         		// x
			0.75 * height,                 				// y
			diameter);                                 	// r
		text(nbEllipse, 0.5 * width, 0.75 * height);
		
		rect(0.5 * width,                             	// x
			0.25 * height,                            	// y
			diameter);                                 	// r 
		text(nbSquare, 0.5 * width, 0.25 * height);
	} else {
		ellipse(
			0.75 * width,                          		// x
			0.5 * height,                     			// y
			diameter);                                 	// r
		text(nbEllipse, 0.75 * width, 0.5 * height);

		rect(0.25 * width,                            	// x
			0.5 * height,                             	// y
			diameter);                                 	// r 
		text(nbSquare, 0.25 * width, 0.5 * height);
	}
}

let updateWatterDrop = () => {
	// particles animation
	for (let i = 0; i < particles.length; i++) {
		if (particles[i].size < 10) {
			particles[i].update();
			particles[i].display();
		}
		else {
			particles.splice(i, 1);
		}
	}
}

let updateDisplay = () => {
	// print computed pi and number of iteration in html 
	pi.textContent = round(4 * nbEllipse / nbSquare, 10).toFixed(10); // print all 0 to stabilize the box size
	iter.textContent = n;
}

let createWatterDrop = (show) => {
	// "show" permit to create point without display them
	// usefull for the add iteration button
	n++;
	x = random(width);
	y = random(height);

	// checking if in a figure and increment a variable if yes (to compute pi)
	if (isMobile) {
		//In the square
		if (x > 0.5 * width - 0.5 * diameter 		// right 
			& x < 0.5 * width + 0.5 * diameter 		// left 
			& y < 0.25 * height + 0.5 * diameter	// bottom
			& y > 0.25 * height - 0.5 * diameter) {	// top
			nbSquare++;
		}
		// In the ellipse
		else if (pow(x - 0.5 * width, 2) + pow(y - 0.75 * height, 2) < pow(0.5 * diameter, 2)) {
			nbEllipse++;
		}
	}
	else {
		//In the square
		if (x > 0.25 * width - 0.5 * diameter 		// right 
			& x < 0.25 * width + 0.5 * diameter 	// left 
			& y < 0.5 * height + 0.5 * diameter		// bottom
			& y > 0.5 * height - 0.5 * diameter) {	// top
			nbSquare++;
		}
		// In the ellipse
		else if (pow(x - 0.75 * width, 2) + pow(y - 0.5 * height, 2) < pow(0.5 * diameter, 2)) {
			nbEllipse++;
		}
	}


	if(show){
		particles.push(new WatterDrop(x, y));
	}
}