// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 2;
let direction = "right";
let locked = true;
  
let xStart = 0; //starting x coordinate for snake
let yStart = 120; //starting y coordinate for snake
let diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;

let xBUP = 0;
let yBUP = 0;

let xSP = 0;
let ySP = 0;

let score = 0;

const totalTime = 1 * 1000 * 30;
const startTime = new Date().valueOf();

function setup() {
  stroke("red");
  createCanvas(1530, 860);
  frameRate(30);
  stroke(175);
  strokeWeight(10);
  updateFruitCoordinates();
  updateBUPCoor();
  updateSPCoor();



  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  updateSnakeCoordinates();
  checkGameStatus();
  stroke("red");
  checkForFruit();
  stroke("green");
  checkForBUP();
  stroke("blue");
  checkForSP();
  stroke("250");
  textSize(30);
  strokeWeight(3);
  fill("black");
  text(score, 10, 30);
  strokeWeight(10);
  renderTime();
}

/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case "right":
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "up":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case "left":
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "down":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
    )
   {
    //noLoop();
  }
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
    score += 10;
    console.log(score);
  }
}

function updateFruitCoordinates() {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}
//player Movement
function keyPressed() {
  switch (keyCode) {
    case 65:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 68:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 87:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 83:
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case 81:
      frameRate(60);
      break;
    case 69:
      frameRate(3);
      break;
  }
}

//Bullet-Time Power-UPs
function updateBUPCoor() {
  xBUP = floor(random(10, (width - 100) / 10)) * 10;
  yBUP = floor(random(10, (height - 100) / 10)) * 10;
}

function checkForBUP() {
  point(xBUP, yBUP);
  if (xCor[xCor.length - 1] === xBUP && yCor[yCor.length - 1] === yBUP) {
    frameRate(30);
    updateBUPCoor();
    score += 10;
    console.log(score);
  }
}

//Speed Power-UPs
function updateSPCoor() {
  xSP = floor(random(10, (width - 100) / 10)) * 10;
  ySP = floor(random(10, (height - 100) / 10)) * 10;
}

function checkForSP() {
  point(xSP, ySP);
  if (xCor[xCor.length - 1] === xSP && yCor[yCor.length - 1] === ySP) {
    frameRate(60);
    updateSPCoor();
    score += 10;
    console.log(score);
  }
}

//QOL
function mousePressed() {

}
function mouseClicked() {

}

//timer
function getHMS(m /* milliseconds */) {
  return [1000, 1000 * 60, 1000 * 60 * 60].reduce((hms, scl) => {
    let gimmeTime = Math.floor((m / scl) % 60);
    hms.push(gimmeTime);
    return hms;
  }, []);
}

function renderTime() {
  const currentTime = new Date().valueOf();
  const deltaTime = currentTime - startTime;
  const timeRemaining = totalTime - deltaTime;
  const [sec, min, hr] = getHMS(timeRemaining);
  const time = `${min}:${sec}`;
  if (sec === 0 && min === 0 && hr === 0) {
    createCanvas(1530, 860);
    console.log("GAME OVER");
    gameOver();
  }
  fill(0);
  textSize(37);
  text(time, 1450, 50);
}

function gameOver() {
  createCanvas(1530, 860);
  
  text('Deine Zeit ist abgelaufen.  Dein Score war: ' + score + ' Um weiterzuspielen musst du die Seite neu laden.' , width / 2, height /2);
  noLoop();
  }

