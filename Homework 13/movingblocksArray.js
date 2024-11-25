let player;
let obstacles = [];
let stationaryObstacle = null;
let exitArea;
let win = false;

function setup() {
  createCanvas(800, 600);

  player = {
    x: 50,
    y: 50,
    size: 30,
    color: 'blue'
  };

  for (let i = 0; i < 5; i++) {
    obstacles.push(createRandomObstacle());
  }

  exitArea = { x: width - 80, y: height - 80, size: 60, color: 'orange' };
}

function draw() {
  background(240);

  fill(exitArea.color);
  rect(exitArea.x, exitArea.y, exitArea.size, exitArea.size);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("EXIT", exitArea.x + exitArea.size / 2, exitArea.y + exitArea.size / 2);

  fill(player.color);
  rect(player.x, player.y, player.size, player.size);

  movePlayer();

  for (let obs of obstacles) {
    fill(obs.color);
    rect(obs.x, obs.y, obs.width, obs.height);
    moveObstacle(obs);
  }

  if (stationaryObstacle) {
    fill(stationaryObstacle.color);
    rect(stationaryObstacle.x, stationaryObstacle.y, stationaryObstacle.width, stationaryObstacle.height);
  }

  if (
    player.x + player.size > exitArea.x &&
    player.y + player.size > exitArea.y
  ) {
    win = true;
  }

  if (win) {
    textSize(32);
    fill('green');
    text('Victory!', width / 2, height / 2);
    noLoop();
  }
}

function movePlayer() {
  if (keyIsDown(65) && player.x > 0) {
    player.x -= 5;
  }
  if (keyIsDown(68) && player.x < width - player.size) {
    player.x += 5;
  }
  if (keyIsDown(87) && player.y > 0) {
    player.y -= 5;
  }
  if (keyIsDown(83) && player.y < height - player.size) {
    player.y += 5;
  }
}

function createRandomObstacle() {
  let x = random(width);
  let y = random(height);
  let widthSize = random(40, 80);
  let heightSize = random(30, 60);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let fillColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  let dx = random([-3, -2, 2, 3]);
  let dy = random([-3, -2, 2, 3]);

  return { x, y, width: widthSize, height: heightSize, color: fillColor, dx, dy };
}

function moveObstacle(obstacle) {
  obstacle.x += obstacle.dx;
  obstacle.y += obstacle.dy;

  if (obstacle.x > width) obstacle.x = 0;
  if (obstacle.x + obstacle.width < 0) obstacle.x = width;
  if (obstacle.y > height) obstacle.y = 0;
  if (obstacle.y + obstacle.height < 0) obstacle.y = height;
}

function mousePressed() {
  if (!stationaryObstacle) {
    stationaryObstacle = {
      x: mouseX,
      y: mouseY,
      width: 70,
      height: 50,
      color: 'purple'
    };
  }
}