class Envelope {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.attackTime = 0.1;
    this.decayTime = 0.1;
    this.sustainTime = 0.6;
    this.releaseTime = 0.2;

    this.attackLevel = 1;
    this.sustainLevel = 0.5;
    this.releaseLevel = 0;
  }

  drawSelf() {
    let t1 = this.w * this.attackTime;
    let l1 = -this.h * this.attackLevel;
    let t2 = this.w * (this.attackTime + this.decayTime);
    let l2 = -this.h * this.sustainLevel;
    let t3 = this.w * (this.attackTime + this.sustainTime + this.decayTime);
    let l3 = l2;
    let t4 =
      this.w *
      (this.attackTime + this.sustainTime + this.decayTime + this.releaseTime);
    let l4 = -this.h * this.releaseLevel;
    push();
    fill(contentColor, 20);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    // draw ADSR
    stroke(200, 100, 125, 200);
    translate(this.x, this.y + this.h);
    line(0, 0, t1, l1);
    line(t1, l1, t2, l2);
    line(t2, l2, t3, l3);
    line(t3, l3, t4, l4);
    // annotate

    pop();
  }
}
