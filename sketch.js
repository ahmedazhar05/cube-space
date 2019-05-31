/*
 * This is 'Cube Space', a game created by Azhar Ahmed
 * using p5.js (www.p5js.org) javascript library.
 * The goal of creation of this game is to test out self possibilites and 
 * possibilities of p5js in game developement.
 *
 * In this game, a Red Cube moves forward in its path towards horizon 
 * and there are black hurdles which comes on its way, a player has 
 * to control the Red Cube dodging the hurdles so that it can 
 * continue on its path.
 * 
 * One who travels farthest or scores the highest, Wins !
 *
 * The source code of the game is available @ 
 * Play and Share it with your Friends ! Enjoy !
 * Thank You !
 */

var mybox;
var hurdle = [];
let rows;
let cam;
let base;
let speed;
let run;
let camsp; //camera speed
let h;
let sc; //screen
let screenshow;
let score;
let screen;
let s;
let fc; //camera framecount everytime game pauses
let level = [];
let ind; //level index
let hspeed;//hurdle speed
let crash;

function preload() {
  s = {
    start: loadImage('https://i.imgur.com/7jYQerq.png'),
    over: loadImage('https://i.imgur.com/nj9AoLP.png'),
    score: loadImage('https://i.imgur.com/02ApgEr.png'),
    pause: loadImage('https://i.imgur.com/ySXny4s.png'),
    level: loadImage('https://i.imgur.com/qTUb9NJ.png'),
    flevel: loadImage('https://i.imgur.com/WXC7xpP.png'),
    ov: loadImage('https://i.imgur.com/DYwHfx5.png'),
  }
  num = [
    loadImage('https://i.imgur.com/8trBP33.png'), //0
    loadImage('https://i.imgur.com/T6BwHqp.png'), //1
    loadImage('https://i.imgur.com/1RtvTQw.png'), //2
    loadImage('https://i.imgur.com/GhreAWo.png'), //3
    loadImage('https://i.imgur.com/wv65HJe.png'), //4
    loadImage('https://i.imgur.com/9mBwW4I.png'), //5
    loadImage('https://i.imgur.com/RgDJR9a.png'), //6
    loadImage('https://i.imgur.com/33vC0Ip.png'), //7
    loadImage('https://i.imgur.com/czfTA9L.png'), //8
    loadImage('https://i.imgur.com/OyUKIsq.png'), //9
    //loadImage('https://i.imgur.com/l0zXha6.png'), //10
  ];
}

function getImage(index) {
  switch (index) {
    case 1:
      return s.start;
    case 2:
      return s.over;
    case 3:
      return s.score;
    case 4:
      return num;
    case 5:
      return s.pause;
    case 6:
      return s.level;
    case 7:
      return s.flevel;
    case 8:
      return s.ov;
  }
}

function setup() {

  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB);

  fc = 0;
  bg = loadImage('https://i.imgur.com/34soDlj.png');
  run = false;
  camsp = 2;//default camera speed
  camMove = true;
  screenshow = 'S';
  crash=0;
  //LEVEL  1    2     3     4     5      6      7      8      9      10     11
  level = [0, 1500, 4000, 6300, 12700, 20900, 27100, 32700, 45700, 60000, 76500];
  ind = 0;

  base = { //game base
    w: width / 2, //300
    h: height * 1.5, //900
    d: width / 30, //20
  };

  //Level 1 Setting
  rows = 2; //3 rows of hurdles at max in the screen or on the base
  speed = 3; //mybox direction and speed
  score = level[0];//level[0];
  hspeed=4;
  h = int(base.w / getSize(false) /*hurdle's size*/ ) - 7;

  cam = createCamera();
  cam.pan(0);
  //cam.setPosition(0, 0, base.h * 55 / 90);

  //controller box initialisation
  mybox = new Box(true);

  //hurdles initialization
  hurdle[0] = [];
  for (let j = 0; j < h; j++) {
    hurdle[0].push(new Box(false));
  }

  //screen initialization
  sc = new Screen();
}

function draw() {

  background(86, 176, 255);

  //cam.setPosition(0, 0, base.h * 75 / 90);

  //screen change/display
  if (screenshow === 'S') {
    cam.setPosition(0, 0, base.h * 75 / 90);
    sc.start();
    noLoop();
  } else if (screenshow === 'E') {
    sc.enter();
  } else if (screenshow === 'P') {
    sc.score(score,ind + 1);
  }
  if (screenshow === 'O') {
    cam.setPosition(0, 0, base.h * 75 / 90);
    sc.over(score);
    noLoop();
  }

  //levelUp pop-up
  if (screenshow == 'P') {
    if (score >= level[ind] && score < level[ind] + 75) {
      sc.levelup(ind + 1);
    } else if (ind < level.length && score + abs(hspeed) > level[ind + 1]) {
      sc.reset();
      
      if(ind < 11)
        ind += 1;
      switch(ind+1){
        case 2:
          hspeed+=3;
          h+=1;
          break;
        case 5:
        case 7:
        case 8:
          if(speed < 0)
            speed-=0.5;
          else
            speed+=0.5;
        case 3:
        case 5:
        case 9:
          hspeed+=1;
          break;
        case 6:
        case 10:
          h+=1;
          break;
        case 4:
          if(speed < 0)
            speed-=1;
          else
            speed+=1;
        case 11:
          if(speed < 0)
            speed-=1;
          else
            speed+=1;
          rows+=1;
          break;
        default:
      }
      
    }
  }


  //crash
  let lhr = hurdle.length - 1; //Last Hurdle Row
  if (abs(hurdle[lhr][0].y - mybox.y) < (hurdle[lhr][0].size + mybox.size) / 2) {
    for (let i = 0; i < hurdle[lhr].length; i++) {
      if (abs(hurdle[lhr][i].x - mybox.x) < (hurdle[lhr][i].size + mybox.size) / 2) {
        //run=false;
        sc.levelup(12);  //Game Over
        if(crash===0){
          score = score - abs(hspeed);
          speed = 0;
          hspeed =0;
        }else if(crash === 40){
          screenshow = 'O';
        }
        crash=crash+1;
      }
    }
  }

  rotateX(80); //game rotation

  //base
  push();
  stroke(220);
  strokeWeight(0.5);
  ambientLight(220); //240
  ambientMaterial(220); //240
  box(base.w, base.h, 20); //base creation
  pop();


  //keyboard controls
  if (keyIsDown(LEFT_ARROW)) { // && speed > 0) {
    speed = -abs(speed);
  } else if (keyIsDown(RIGHT_ARROW)) { // && speed < 0) {
    speed = abs(speed);
  }

  //hurdles motion
  if (run && screenshow != 'E') {
    score += abs(hspeed);
    for (let j = hurdle.length - 1; j >= 0; j--) {
      for (let k = 0; k < hurdle[j].length; k++) {
        hurdle[j][k].createHurdle(hspeed);
      }
      if (hurdle[j][0].y > (base.h + hurdle[j][0].size) / 2) {
        hurdle.pop(); //Hurdle deletion
      }
    }
    if (hurdle[0][0].y >= -((base.h - hurdle[0][0].size) / 2) + (base.h / rows)) {
      let hdl = [];
      for (let j = 0; j < h; j++) {
        hdl.push(new Box(false));
      }
      hurdle.unshift(hdl); //adding new Hurdle
    }
  } else { // if (screenshow == 'E' && run) {
    for (let j = hurdle.length - 1; j >= 0; j--) {
      for (let k = 0; k < hurdle[j].length; k++) {
        hurdle[j][k].createHurdle(0);
      }
    }
  }
  
  //mybox lightning
  directionalLight(200, 0, 0, -base.w / 2, base.h / 2, 0);

  //controller box movement
  if (screenshow == 'P') {
    if (keyIsPressed === true) {
      //boundary condition
      if (abs(mybox.x + speed) >= (base.w - mybox.size) / 2) {
        diff = ((base.w - mybox.size) / 2) - abs(mybox.x);
        if (speed < 0)
          diff = -diff;
        mybox.createBox(diff);
        cam.move(diff, 0, 0); //game camera movement
      } else {
        mybox.createBox(speed);
        cam.move(speed, 0, 0); //game camera movement
      }
    } else {
      mybox.createBox(0);
    }
  } else {
    mybox.createBox(0);
  }

  //default camera movement
  if (screenshow == 'E') {
    cam.move(camsp, 0, 0);
    if (fc % int((base.w * 2) / (3 * abs(camsp))) === 0) {
      camsp = -camsp; //camera movement direction change
    }
  }

  fc += 1;
}

function keyPressed() {

  if (keyCode === 32) { //spacebar
    if (run) {
      if (screenshow == 'P') { //when game is playing
        screenshow = 'E'; //game enter
        fc = 0;
        camsp = -abs(camsp);
        cam.setPosition(-base.w / 3, 0, base.h * 55 / 90);
        //noLoop();
      } else if (screenshow == 'O') { //when game is over then reset
        //RESET SETTINGS HERE
        for (let i = hurdle.length - 1; i >= 0; i--) {
          hurdle.pop();
        }
        setup();
        loop();
        //cam.setPosition(-base.w / 3, 0, base.h * 55 / 90);
      }
    } else if (screenshow == 'S') { //when game start screen
      screenshow = 'E'; //game enter
      //cam.setPosition(0, 0, base.h * 55 / 90);
      fc = 0;
      camsp = -abs(camsp);
      cam.setPosition(-base.w / 3, 0, base.h * 55 / 90);
      loop();
    }
  } else if ((keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) && screenshow == 'E') {
    screenshow = 'P';
    //camMove = false;
    run = true;
    cam.setPosition(mybox.x, 0, base.h * 55 / 90);
    loop();
  }
  return false;
}

function getBase() {
  return {
    w: width / 2,
    h: height * 1.5,
    d: width / 30,
  };
}
