let size;
let x, y, z;
class Box {

  constructor(bool) {
    
    let base=getBase();
    
    let colour;
    if (bool) {

      this.size = base.w/10; //30
      this.colour = [128, 0, 0];
      this.x = 0;
      this.y = (base.h - this.size) / 2 - base.h / 45; //cornering;

    } else { //hurdles

      this.size = base.w*35/300; //35
      this.colour = [50, 50, 50];
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
    ambientMaterial(this.colour);
    stroke(15);
    strokeWeight(0.5);
    box(this.size);
    pop();
  }
  
}
function getSize(b){
  return ((new Box(b)).size);
}
