function setup() {
    createCanvas(windowWidth,windowHeight);
}

function draw() {
    background('#264653');
    strokeWeight(5); 
    stroke('#E76F51');
    ellipse(4*width/6, height/4 + width/8, width/4, width/4);
    rect(width/6, height/4, width/4, width/4)
}