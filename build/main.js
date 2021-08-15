let isMobile;
let rayon;

function setup() {
	rectMode(CENTER);

	let canevasDiv = document.querySelector('#canevas');
	let w = canevasDiv.clientWidth;
	let h = canevasDiv.clientHeight;
	let canevas = createCanvas(w, h);
	canevas.parent('canevas');
	
	isMobile = (windowWidth < 768) ? true : false;
	rayon = isMobile ? width/2 : width/4;

	background('#264653');
	fill(229, 231, 235);
	strokeWeight(5);
	stroke('#E76F51');
	if(isMobile){
		ellipse(
			width / 2,                         		// x
			3 * height / 4,                 		// y
			rayon);                                 // r

		rect(width / 2,                             // x
			height / 4,                             // y
			rayon);                                 // r 
	} else {
		ellipse(
			3 * width / 4,                          // x
			height / 2,                     		// y
			rayon);                                 // r

		rect(width / 4,                             // x
			height / 2,                             // y
			rayon);                                 // r 
	}
}

function windowResized() {
	setup()
}

function draw() {
	
}

function waterDrop(speed){

}