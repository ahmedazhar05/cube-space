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
 * https://github.com/ahmedazhar05/cube-space
 *
 * Play and Share your score with your Friends ! Enjoy !
 * Thank You !
 */

var mybox, hurdle = [];
let rows,
    cam,
    base,
    speed,
    run,
    camsp, //camera speed
    h,
    sc, //screen
    screenshow,
    score,
    screen,
    s,
    fc, //camera framecount increases everytime game pauses
    level = [],
    ind, //level index
    hspeed, //hurdle speed
    crash,
    cSize, //canvas size
    song, //game music
    bump, //move aside sound
    fail, //game over sound
    start, //game start sound
    down;

function preload() {
  song = loadSound('https://srv-file1.gofile.io/download/vYeU49/LifeIsMusic.mp3');
  bump = loadSound('https://srv-file1.gofile.io/download/rPcSXf/collision.mp3');
  fail = loadSound('https://srv-file1.gofile.io/download/rPcSXf/losec03.mp3');
  start = loadSound('https://srv-file1.gofile.io/download/rPcSXf/Pressstartphoenixwright.mp3');
  
  
  s = {
    start: loadImage('https://i.imgur.com/9sGVhCw.png'),
    over: loadImage('https://i.imgur.com/mFwJcWt.png'),
    score: loadImage('https://i.imgur.com/02ApgEr.png'),
    pause: loadImage('https://i.imgur.com/APpKT78.png'),
    level: loadImage('https://i.imgur.com/qTUb9NJ.png'),
    flevel: loadImage('https://i.imgur.com/WXC7xpP.png'),
    ov: loadImage('https://i.imgur.com/DYwHfx5.png'),
    save: loadImage('https://i.imgur.com/mFwJcWt.png'),
  };
  
  num = [loadImage('https://i.imgur.com/8trBP33.png'), //0
         loadImage('https://i.imgur.com/T6BwHqp.png'), //1
         loadImage('https://i.imgur.com/1RtvTQw.png'), //2
         loadImage('https://i.imgur.com/GhreAWo.png'), //3
         loadImage('https://i.imgur.com/wv65HJe.png'), //4
         loadImage('https://i.imgur.com/9mBwW4I.png'), //5
         loadImage('https://i.imgur.com/RgDJR9a.png'), //6
         loadImage('https://i.imgur.com/33vC0Ip.png'), //7
         loadImage('https://i.imgur.com/czfTA9L.png'), //8
         loadImage('https://i.imgur.com/OyUKIsq.png'), //9
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
    case 9:
      return s.save;
  }
}

function setup() {
  
  let wid = window.innerWidth,
    ht = window.innerHeight;
  if (wid > 600 && ht > 600) {
    if (wid < ht) {
      cSize = wid;
    } else {
      cSize = ht;
    }
  } else {
    cSize = 600;
  }
  
  createCanvas(cSize, cSize, WEBGL);
  frameRate(30);
  angleMode(DEGREES);
  colorMode(RGB);
  
  song.playMode('restart');
  bump.playMode('restart');
  bump.setVolume(0.5);
  song.loop();
  
  base = {  //game base
    w: width / 2,
    h: height * 1.5,
    d: width / 30,
  };
  
  fc = 0;
  run = false;
  camsp = base.w / 150;
  screenshow = 'S';
  crash = 0;
  down = false;
  
  //LEVEL  1   2     3     4     5     6     7     8     9    10    11
  level = [0, 600, 1400, 2200, 3250, 4200, 5300, 6300, 7300, 8400, 9500];
  
  ind = 0;
  
  //Level 1 Setting
  rows = 2; //3 rows of hurdles at max in the screen or on the base
  speed = base.w / 150; //mybox direction and speed
  score = level[0]; //0
  hspeed = base.h / 225; //hurdle speed
  h = int(base.w / getSize(false)) - 7;
  
  //camera
  cam = createCamera();
  cam.pan(0);
  
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
  if (screenshow === 'S') {
    cam.setPosition(0, 0, base.h * 75 / 90);
    sc.start();
    noLoop();
  } else if (screenshow === 'E') {
    sc.enter();
  } else if (screenshow === 'P') {
    sc.score(score, ind + 1);
  }
  if (screenshow === 'O') {
    cam.setPosition(0, 0, base.h * 75 / 90);
    sc.over(score, true);
    noLoop();
  } else if (screenshow === 'V') {
    cam.setPosition(0, 0, base.h * 75 / 90);
    sc.over(score, false);
    saveCanvas('CubeSpace-' + score, 'jpg');
    sc.over(score, true);
    screenshow = 'O';
    noLoop();
  }
  
  //levelUp pop-up
  if (screenshow === 'P') {
    if (score >= level[ind] && score < level[ind] + 25 && crash === 0) {
      sc.levelup(ind + 1);
    } else if (ind < level.length && score + 1 > level[ind + 1]) {
      sc.reset();
      if (ind < 11) {
        ind += 1;
      }
      switch (ind + 1) {
        case 2:
          hspeed += height / 200;
          h += 1;
          break;
        case 5:
        case 7:
        case 8:
          if (speed < 0)
            speed -= width / 1200;
          else
            speed += width / 1200;
        case 3:
        case 5:
        case 9:
          hspeed += height / 600;
          break;
        case 6:
        case 10:
          h += 1;
          break;
        case 4:
        case 11:
          if (speed < 0)
            speed -= width / 600;
          else
            speed += width / 600;
          rows += 1;
          break;
      }
    }
  }
  
  //crash
  let lhr = hurdle.length - 1; //Last Hurdle Row
  if (abs(hurdle[lhr][0].y - mybox.y) < (hurdle[lhr][0].size + mybox.size) / 2) {
    for (let i = 0; i < hurdle[lhr].length; i++) {
      if (abs(hurdle[lhr][i].x - mybox.x) < (hurdle[lhr][i].size + mybox.size) / 2) {
        sc.levelup(12); //"GAME OVER"
        if (crash === 0) {
          bump.stop();
          song.stop();
          fail.play();
          speed = 0;
          hspeed = 0;
        } else if (crash === 40) {
          screenshow = 'O';
        }
        crash = crash + 1;
      }
    }
  }
  
  rotateX(80); //game rotation
  
  //base
  push();
  stroke(220);
  strokeWeight(0.5);
  ambientLight(220);
  ambientMaterial(220);
  box(base.w, base.h, 20); //base creation
  pop();
  
  //key controls
  if (keyIsDown(LEFT_ARROW)) {
    if (!down) {
      bump.play();
    }
    down = true;
    speed = -abs(speed);
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (!down) {
      bump.play();
    }
    down = true;
    speed = abs(speed);
  }
  
  //mouseControls
  let xCond = (mouseX > 0 && mouseX < width),
      yCond = (mouseY > 0 && mouseY < height),
      left = mouseX < width / 3,
      right = mouseX > width * 2 / 3;
  if (mouseIsPressed) {
    if (!down && (left || right) && (yCond && xCond)) {
      bump.play();
    }
    down = true;
    if (screenshow === 'P' && yCond) {
      if ((mouseX > 0) && left) {
        speed = -abs(speed);
      } else if ((mouseX < width) && right) {
        speed = abs(speed);
      }
    }
  }
  
  //hurdles motion
  if (screenshow === 'P') {
    for (let j = hurdle.length - 1; j >= 0; j--) {
      for (let k = 0; k < hurdle[j].length; k++) {
        hurdle[j][k].createHurdle(hspeed);
      }
      if (hurdle[j][0].y > (base.h / 2) + hurdle[j][0].size * 1.5) {
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
  } else {
    for (let j = hurdle.length - 1; j >= 0; j--) {
      for (let k = 0; k < hurdle[j].length; k++) {
        hurdle[j][k].createHurdle(0);
      }
    }
  }
  
  //mybox lightning
  directionalLight(255, 20, 20, -base.w / 2, base.h / 2, 0);
  
  //controller box movement
  if (screenshow === 'P') {
    if (keyIsPressed || (mouseIsPressed && (xCond && yCond))) {
      if (abs(mybox.x + speed) >= (base.w - mybox.size) / 2) {
        diff = ((base.w - mybox.size) / 2) - abs(mybox.x);
        if (speed < 0) diff = -diff;
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
  if (screenshow === 'E') {
    cam.move(camsp, 0, 0);
    if (fc % int((base.w * 2) / (3 * abs(camsp))) === 0) {
      camsp = -camsp; //camera movement direction change
    }
    fc += 1;
  } else if (screenshow === 'P' && crash === 0) {
    score += 1;
  }
}

function keyReleased() {
  down = false;
}

function keyPressed() {
  if (keyCode === 32) { //spacebar
    if (run) {
      if (screenshow === 'P') { //when game is playing
        screenshow = 'E'; //Pause Menu
        fc = 0;
        camsp = -abs(camsp);
        cam.setPosition(-base.w / 3, 0, base.h * 55 / 90);
        
      } else if (screenshow === 'O') { //when game is over then reset
        //RESET SETTINGS HERE
        for (let i = hurdle.length - 1; i >= 0; i--) {
          hurdle.pop();
        }
        setup();
        loop();
      }
    } else if (screenshow == 'S') { //when game start screen
      start.play();
      screenshow = 'E';//Pause Menu
      fc = 0;
      camsp = -abs(camsp);
      cam.setPosition(-base.w / 3, 0, base.h * 55 / 90);
      loop();
    }
  } else if ((keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) && screenshow === 'E') {
    screenshow = 'P';
    run = true;
    cam.setPosition(mybox.x, 0, base.h * 55 / 90);
    loop();
  }
  return false;
}

function touchEnded() {
  down = false;
}

function mousePressed() {
  let xCond = (mouseX > 0 && mouseX < width),
    yCond = (mouseY > 0 && mouseY < height),
    left = mouseX < width / 3,
    right = mouseX > width * 2 / 3;
  if (screenshow === 'S' && (xCond && yCond)) {
    screenshow = 'E'; //Pause Menu
    start.play();
    fc = 0;
    camsp = -abs(camsp);
    cam.setPosition(-base.w / 3, 0, base.h * 55 / 90);
    loop();
  } else if (screenshow === 'E' && (left || right) && (xCond && yCond)) {
    screenshow = 'P';
    run = true;
    cam.setPosition(mybox.x, 0, base.h * 55 / 90);
    loop();
  } else if (screenshow === 'P' && (!left && !right) && (xCond && yCond)) {
    screenshow = 'E'; //Pause Menu
    fc = 0;
    camsp = -abs(camsp);
    cam.setPosition(-base.w / 3, 0, base.h * 55 / 90);
  } else if (screenshow === 'O') { //when game is over then reset
    if ((mouseY > height * 11 / 19 && mouseY < height * 16 / 19) && (mouseX > width * 125 / 190 && mouseX < width * 17 / 19)) {
      screenshow = 'V'; //save screen
      loop();
    } else if (xCond && yCond) {
      //RESET SETTINGS HERE
      for (let i = hurdle.length - 1; i >= 0; i--) {
        hurdle.pop();
      }
      setup();
      loop();
    }
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
