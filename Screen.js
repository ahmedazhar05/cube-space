class Screen {
  constructor() {
    let z = 0;
  }
  start() {
    push();
    translate(0, 0, width*49/60);
    this.format(getImage(1), getBase().w, getBase().h / 3);
    pop();
  }
  enter() {
    let inc = 3;
    push();
    translate(mybox.x, /*-180*/-height/2 + (height/15)*inc, /*mybox.y-400*/0);
    noStroke();
    texture(getImage(5));
    plane((width/10)*inc, (height/15)*inc);
    //translate(mybox.x, mybox.z + getSize(true)/2, mybox.y);
    translate(0, +height/2 - (height/15)*inc + mybox.z + getSize(true)/2/*mybox.z + getSize(true)/2 +180*/, mybox.y);
    rotateX(millis()/10);
    translate(getSize(true)*3/2, 0,0);
    this.arrow();
    translate(-getSize(true)*3, 0, 0);
    rotateZ(-180);
    this.arrow();
    pop();
  }
  score(sc, lvl) { //game score update on top
    let num = 5; //max digits of score
    let inc = 1.5; //digit size increment
    let nWidth = (width * 3 / 100) * inc; //number width
    let sWidth = (width * 3 / 20) * inc; //"Score" width
    let ht = (height / 15) * inc; //height of all
    noStroke();
    push();
    translate(mybox.x - width / 2 + sWidth / 2 /*mybox.x - (sWidth + (nWidth * 4)) / 2*/ , -height/2 + ht/2, 0);
    texture(getImage(3));
    plane(sWidth, ht); //SCORE
    translate((sWidth + nWidth) / 2 + (num * nWidth), 0, 0);
    sc = int(sc)*10;
    for (let i = 0; i < num; i++) {
      sc = int(sc / 10);
      translate(-nWidth, 0, 0);
      texture(getImage(4)[sc % 10]);
      plane(nWidth, ht); //displaying numbers
    }
    pop();
    if (lvl < 11) {
      let lWidth = (width * 11 / 75) * inc; //"Level" width
      push();
      translate(mybox.x + width / 2 - (lWidth / 2 + nWidth * 2),  -height/2 + ht/2, 0);
      texture(getImage(6));
      plane(lWidth, ht); //LEVEL
      translate(lWidth / 2 + nWidth * 5 / 2, 0, 0);
      lvl = int(lvl * 10);
      for (let i = 0; i < 2; i++) {
        lvl = int(lvl / 10);
        translate(-nWidth, 0, 0);
        texture(getImage(4)[lvl % 10]);
        plane(nWidth, ht); //Level Numbers
      }
      pop();
    } else if (lvl === 11) {
      let lWidth = (width * 17 / 75) * inc; //"Level" width
      push();
      translate(mybox.x + width / 2 - lWidth / 2, -height/2 + ht/2, 0);
      texture(getImage(7));
      plane(lWidth, ht); //FINAL LEVEL
      pop();
    }
  }
  levelup(lvl) {
    this.z = this.z + 3; //speed of movement towards the screen
    let inc = 3;
    let ht = (height / 15) * inc; //height of both "Level" and number
    if (lvl < 11) {
      let lWidth = (width * 11 / 75) * inc; //"Level" width
      let nWidth = (width * 3 / 100) * inc; //number width
      push();
      translate(mybox.x - (lWidth + (2 * nWidth)) / 2 + lWidth / 2, -height/4, this.z);
      texture(getImage(6));
      plane(lWidth, ht); //LEVEL
      translate(lWidth / 2 + nWidth * 5 / 2, 0, 0);
      lvl = int(lvl * 10);
      for (let i = 0; i < 2; i++) {
        lvl = int(lvl / 10);
        translate(-nWidth, 0, 0);
        texture(getImage(4)[lvl % 10]);
        plane(nWidth, ht); //Level Numbers
      }
      pop();
    } else if (lvl === 11) {
      let lWidth = (width * 17 / 75) * inc; //"Level" width
      push();
      translate(mybox.x, -height/4, this.z);
      texture(getImage(7));
      plane(lWidth, ht); //FINAL LEVEL
      pop();
    } else if (lvl === 12) {
      push();
      translate(mybox.x, -height/4, 0);
      texture(getImage(8));
      plane((width*1/4)*inc , (height/15)*inc); //GAME OVER
      pop();
    }

  }
  over(score) { //game score
    let inc = 1.25; //size incremental value
    let num = {
      w: (width * 3 / 100) * inc,
      h: (height / 15) * inc,
    };
    push();
    noStroke();
    translate(0, 0, width*49/60);
    this.format(getImage(2), getBase().w, getBase().h / 3);//Game Over Screen
    score=int(score);
    translate(((score + "").length) * num.w / 2 + num.w / 2, -height/40, 0);
    while (score != 0) {
      translate(-num.w, 0, 0);
      texture(getImage(4)[score % 10]);
      plane(num.w, num.h);
      score = int(score / 10);
    }
    pop();
  }
  format(graphics, w, h) {
    //cam.setPosition(0, 0, base.h * 75 / 90);
    push();
    noStroke();
    texture(graphics);
    plane(w, h);
    pop();
  }
  reset() {
    this.z = 0;
  }

  arrow() {
    let inc=getSize(true)/300;
    strokeWeight(0.1);
    stroke(0,190,82);
    fill(0,128,55);
    beginShape(TRIANGLE_STRIP);
    //backarrow full (square + triangle)
    vertex(-150 * inc, 75 * inc, -50 * inc);
    vertex(-150 * inc, -75 * inc, -50 * inc);
    vertex(0 * inc, 75 * inc, -50 * inc);
    vertex(0 * inc, -75 * inc, -50 * inc);
    vertex(0 * inc, -150 * inc, -50 * inc);
    vertex(150 * inc, 0 * inc, -50 * inc);
    vertex(0 * inc, -150 * inc, -50 * inc);
    vertex(0 * inc, 75 * inc, -50 * inc);
    vertex(150 * inc, 0 * inc, -50 * inc);
    vertex(0 * inc, 150 * inc, -50 * inc);
    vertex(0 * inc, 75 * inc, -50 * inc);

    //front arrow square
    vertex(0 * inc, 75 * inc, 50 * inc);
    vertex(-150 * inc, 75 * inc, 50 * inc);
    vertex(-150 * inc, -75 * inc, 50 * inc);
    vertex(-150 * inc, 75 * inc, -50 * inc);
    vertex(-150 * inc, -75 * inc, -50 * inc);
    vertex(0 * inc, -75 * inc, -50 * inc);
    vertex(-150 * inc, -75 * inc, 50 * inc);
    vertex(0 * inc, -75 * inc, 50 * inc);
    vertex(0 * inc, 75 * inc, 50 * inc);

    //arrow front triangle
    vertex(0 * inc, -150 * inc, 50 * inc);
    vertex(150 * inc, 0 * inc, 50 * inc);
    vertex(0 * inc, -150 * inc, 50 * inc);
    vertex(0 * inc, 75 * inc, 50 * inc);
    vertex(150 * inc, 0 * inc, 50 * inc);
    vertex(0 * inc, 150 * inc, 50 * inc);
    vertex(0 * inc, 75 * inc, 50 * inc);
    vertex(0 * inc, 150 * inc, -50 * inc);

    //arrow slanting botton half
    vertex(150 * inc, 0 * inc, 50 * inc);
    vertex(150 * inc, 0 * inc, -50 * inc);

    //arrow slanting top
    vertex(0 * inc, -150 * inc, 50 * inc);
    vertex(0 * inc, -150 * inc, -50 * inc);

    //arrow vertical top
    vertex(0 * inc, -75 * inc, 50 * inc);
    vertex(0 * inc, -75 * inc, -50 * inc);

    //arrow horizontal base
    vertex(0 * inc, 75 * inc, -50 * inc);
    vertex(-150 * inc, 75 * inc, 50 * inc);
    vertex(-150 * inc, 75 * inc, -50 * inc);

    //arrow slanting botton other half
    vertex(0 * inc, 75 * inc, -50 * inc);
    vertex(150 * inc, 0 * inc, 50 * inc);
    vertex(0 * inc, 150 * inc, -50 * inc);
    vertex(0 * inc, 150 * inc, 50 * inc);
    endShape();
  }
}
