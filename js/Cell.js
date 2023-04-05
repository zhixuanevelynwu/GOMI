class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 7;
    this.minR = this.r;
    this.maxR = this.r * 2.5;
    this.selected = false;
  }
  drawSelf() {
    if (this.selected) {
      fill(contentColor);
    }
    ellipse(this.x, this.y, this.r, this.r);
    this.collide();
  }
  collide() {
    if (dist(this.x, this.y, mouseX, mouseY) < this.r) {
      this.r = min(this.r + 1, this.maxR);
      if (mouseIsPressed) {
        this.selected = true;
      }
    } else {
      this.r = this.minR;
    }
  }
}
