var man;
let img, img2;
let rock;
let rocks = [];
let sceneNum = 0;

function setup() {
  createCanvas(400, 400);

  img = loadImage("pacman.png");
  img2 = loadImage("rock(ghost).png")
  bgd = loadImage("pacmaze.png")
  man = new Person(img);
  rock = new Obstacle(img2);

  //obstacel as a rock
  for (let i = 0; i < 2000 ; i++) {
    rocks[i] = new Obstacle(img2, random(50),random(5));
  }
}

function scene1() {
  sceneNum = 1;
  
  background(20, 20, 100);
  fill(250, 250, 100);
  textSize(40);
  text("Pac-Attack!", 100, 150);
  textSize(20);
  text("Oh how the tables have turned...", 60, 200);
  fill(255);
  textSize(14);
  text("Press the space key to jump and eat the ghosts!", 40, 270);
  text("Eat as many as you can, but act fast! You only have 3km to do it!", 1, 295);
  text("If you fall past the bottom of the screen, you lose!", 30, 320);
  text("Press 'h' to begin.", 140, 370);
}


function keyPressed() {
  if (sceneNum == 1 && key == 'h') {
    man.pos.y = 150;
    man.pos.x = 0;
    man.score = 0;
    game();
  }
  else if (key == ' ') {
    let force = createVector(0, -16);
    man.applyForce(force);
  } 
}

function mouseClicked() {
  if (sceneNum == 3 && mouseX >= 150 && mouseX <= 250 && mouseY >= 300 && mouseY <= 350) {
    scene1();
  
  } else if (sceneNum == 4 && mouseX >= 150 && mouseX <= 250 && mouseY >= 300 && mouseY <= 350) {
    scene1();
  }
}

function draw() {
  if (sceneNum == 0 || sceneNum == 1) {
    scene1();
  } else if (man.pos.y > height) {
    lose();
  }else if (sceneNum == 2 && man.pos.x < 3000) {
    
    game();
  } else if (man.pos.x >= 3000) {
    distanceComplete();
  } 
}

function distanceComplete() {
  sceneNum = 4;
  background(20, 20, 100);
  fill(250, 250, 100);
  textSize(40);
  text("Distance Complete!", 30, 200);
  textSize(22);
  text("Score: " + man.score, 100, 240);
  textSize(15);
  text("+20 point win bonus", 205, 237);
  textSize(30);
  text("Total Score: " + (man.score + 20), 105, 275);
  
  //play again button
  rect(150, 300, 100, 50, 10);
  fill(0);
  textSize(15);
  text("Play Again", 165, 330);
}

function lose() {
  sceneNum = 3;
  background(20, 20, 100);
  fill(250, 250, 100);
  textSize(40);
  text("You Lost!", 120, 200);
  textSize(30);
  text("Score: " + man.score, 140, 250);
  
  //play again button
  rect(150, 300, 100, 50, 10);
  fill(0);
  textSize(15);
  text("Play Again", 165, 330);
}

function game() {
  sceneNum = 2;
   background(bgd);

  //point of view around "man"
  translate((-man.pos.x + 50), 0);

  let gravity = createVector(0, 0.8);
  man.applyForce(gravity);


  //the player
  man.update();
  man.display();
  man.edges();

  //an obstacle as a rock
  rock.update();
  rock.display();
  rock.edges();

  //obstacel as a rock
  for (let i = 0; i < rocks.length; i++) {
    rocks[i].update();
    rocks[i].display();
    rocks[i].edges();
    man.hits(rocks[i]);
  }
  

}
