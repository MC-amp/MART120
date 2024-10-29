function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200,200,200,250);
  ellipse(150,150,30,20);
  rect(140,150,20,7);
  ellipse(250,150,30,20);
  rect(240,150,20,7);
  triangle(220,200,180,200,200,150);
  line(170, 260, 230, 260);
  line(170, 260, 160, 250);
  line(240, 250, 230, 260);
  textSize(32);
  text('Self Potrait', 110, 30);
  textSize(12);
  text('Matthew Camp', 250, 350);
}