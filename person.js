// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Array of Particles, multiple forces

function Person(img) {
  this.pos = createVector(10, height - 300);
  this.vel = createVector(2, 0);
  this.acc = createVector(0, 0);
  this.pic = img;
  this.score = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    fill(25, 150,30);
    stroke(255);
    textSize(50);
    text("Score: " + this.score, this.pos.x, 100);
    image(this.pic, this.pos.x, this.pos.y, 50, 40);
    
      //countdown
    fill(255);
    textSize(20);
    text("Distance remaining: " + (3000 - this.pos.x + "m"), this.pos.x + 100, 399);
  }

  this.edges = function() {
  if (this.pos.y <= 0) {
      this.vel.y = 0;
      this.pos.y = 0;
    }

  }

 
  
  this.hits = function(obs) {
    if ((obs.pos.x + 25 >= this.pos.x && obs.pos.x + 25 <= (this.pos.x + 50)) && 
      (obs.pos.y + 20 >= this.pos.y && obs.pos.y + 20 <= (this.pos.y + 40))) {
      obs.pos.y = -400;
      this.score++;
    }    
  };
  
}
