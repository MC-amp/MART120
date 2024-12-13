let columns = [];
let ball;
let ballSpeed = 5;
let activeBlueCol = 2;
let lastDirection = -1;
let blueScore = 0;
let redScore = 0;
const winningScore = 10;

function setup() {
  createCanvas(800, 400);

  columns = [
    { color: 'blue', positions: [height / 2], canMoveUp: true, canMoveDown: true },
    { color: 'red', positions: [height / 3, (2 * height) / 3], canMoveUp: true, canMoveDown: true },
    { color: 'blue', positions: [height / 4, height / 2, (3 * height) / 4], canMoveUp: true, canMoveDown: true },
    { color: 'red', positions: [height / 4, height / 2, (3 * height) / 4], canMoveUp: true, canMoveDown: true },
    { color: 'blue', positions: [height / 3, (2 * height) / 3], canMoveUp: true, canMoveDown: true },
    { color: 'red', positions: [height / 2], canMoveUp: true, canMoveDown: true },
  ];

  const columnSpacing = width / (columns.length + 1);
  columns.forEach((col, index) => {
    col.x = columnSpacing * (index + 1);

    let step = height / (col.positions.length + 1);
    col.positions = Array.from({ length: col.positions.length }, (_, i) => step * (i + 1));
  });

  ball = {
    x: width / 2,
    y: height / 2,
    vx: 0,
    vy: 0,
  };
}

function draw() {
  background(255);

  fill('green');
  rect(0, 0, 20, height);
  rect(width - 20, 0, 20, height);

  textSize(24);
  fill(0);
  textAlign(CENTER, TOP);
  text(`Blue: ${blueScore} | Red: ${redScore}`, width / 2, 10);

  columns.forEach((col) => {
    fill(col.color === 'red' ? 'red' : 'blue');
    col.positions.forEach((y) => {
      rect(col.x - 20, y - 20, 40, 40);
    });

    if (col.color === 'red' && frameCount % 20 === 0) {
      let offset = random([-20, 0, 20]);
      col.positions = col.positions.map((y) => constrain(y + offset, 20, height - 20));
      col.canMoveUp = col.positions.every((pos) => pos > 20);
      col.canMoveDown = col.positions.every((pos) => pos < height - 20);
    }
  });

  fill(255);
  circle(ball.x, ball.y, 20);

  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y < 10 || ball.y > height - 10) {
    ball.vy *= -1;
  }

  columns.forEach((col) => {
    col.positions.forEach((y) => {
      if (
        dist(ball.x, ball.y, col.x, y) < 30
      ) {
        if (col.color === 'red') {
          ball.vx *= -1;
          ballSpeed = 10;
          ball.vx = ballSpeed * (ball.vx > 0 ? 1 : -1);
        } else if (col.color === 'blue') {
          ball.vx = 10;
          ball.vy = random([-3, 3]);
        }
      }
    });
  });

  if (frameCount % 60 === 0 && abs(ball.vx) > 1) {
    ballSpeed--;
    ballSpeed = max(ballSpeed, 1);
    ball.vx = ballSpeed * (ball.vx > 0 ? 1 : -1);
  }

  if (ball.x > width - 20) {
    blueScore++;
    resetBall();
  } else if (ball.x < 20) {
    redScore++;
    resetBall();
  }

  if (blueScore === winningScore || redScore === winningScore) {
    noLoop();
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text(blueScore === winningScore ? 'Blue Wins!' : 'Red Wins!', width / 2, height / 2);
  }
}

function keyPressed() {
  if ((key === 'W' || key === 'w') && columns[activeBlueCol].canMoveUp) {
    columns[activeBlueCol].positions = columns[activeBlueCol].positions.map((y) => constrain(y - 20, 20, height - 20));
    columns[activeBlueCol].canMoveUp = columns[activeBlueCol].positions.every((pos) => pos > 20);
    columns[activeBlueCol].canMoveDown = columns[activeBlueCol].positions.every((pos) => pos < height - 20);
  } else if ((key === 'S' || key === 's') && columns[activeBlueCol].canMoveDown) {
    columns[activeBlueCol].positions = columns[activeBlueCol].positions.map((y) => constrain(y + 20, 20, height - 20));
    columns[activeBlueCol].canMoveUp = columns[activeBlueCol].positions.every((pos) => pos > 20);
    columns[activeBlueCol].canMoveDown = columns[activeBlueCol].positions.every((pos) => pos < height - 20);
  } else if (key === 'A' || key === 'a') {
    activeBlueCol = max(activeBlueCol - 2, 0);
  } else if (key === 'D' || key === 'd') {
    if (activeBlueCol < columns.length - 1 && columns[activeBlueCol + 2].color === 'blue') {
      activeBlueCol = min(activeBlueCol + 2, columns.length - 1);
    }
  } else if (key === ' ' && ball.vx === 0 && ball.vy === 0) {
    ball.vx = 10;
    ball.vy = random([-3, 3]);
    ballSpeed = 10;
  }
}

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = 0;
  ball.vy = 0;
  ballSpeed = 5;
}
