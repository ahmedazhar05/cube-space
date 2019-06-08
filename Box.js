let size, x, y, z;
class Box {
  constructor(bool) {
    let base = getBase(),
      colour;
    if (bool) {
      this.size = base.w / 10;
      this.colour = [128, 0, 0];
      this.x = 0;
      this.y = (base.h - this.size) / 2 - base.h / 45; //cornering;
    } else { //hurdles
      this.size = base.w * 35 / 300;
      this.colour = [20, 20, 20];
      this.x = int(random(-base.w / 2 + this.size, base.w / 2 - this.size + 1)); //positioning
      this.y = -(base.h - this.size) / 2; //motion
      
    }
    this.z = (base.d + this.size) / 2; //elevation;
    
  }
  createBox(sp) {
    this.x = this.x + sp; //motion
    
    push();
    translate(this.x, this.y, this.z);
    ambientLight(this.colour);
    noStroke();
    box(this.size);
    pop();
  }
  createHurdle(sp) {
    this.y = this.y + abs(sp); //motion
    push();
    translate(this.x, this.y, this.z);
    ambientLight(this.colour);
    stroke(0);
    strokeWeight(0.5);
    box(this.size);
    pop();
  }
}

function getSize(b) {
  return ((new Box(b)).size);
}
