var notesString = ["c", "d", "e", "f", "g", "a", "b"];
class Canvas {
  constructor(y, startingNote = 3, numNotes = 14) {
    this.x = width * 0.04;
    this.y = y;
    this.startingNote = startingNote;
    this.numNotes = numNotes;
    this.w = width * 0.95;
    this.cellWidth = 20;
    this.cellHeight = 20;
    this.h = this.cellHeight * this.numNotes;
    this.grid = [];
    this.notes = [];
    this.init();
  }

  drawSelf() {
    push();
    fill(contentColor);
    noStroke();
    for (let i = 0; i < this.grid.length; i++) {
      push();
      stroke(contentColor, 180);
      line(
        this.x,
        this.y + i * this.cellHeight,
        this.x + this.w - this.cellWidth + 5,
        this.y + i * this.cellHeight
      );
      pop();
      for (let j = 0; j < this.grid[i].length; j++) {
        // fill(255, (205 * i) / this.grid.length, 120, 180);
        fill(200, 255, 200, 180);
        this.grid[i][j].drawSelf();
      }
      fill(contentColor);
      text(this.notes[i], this.x - 20, this.y + i * this.cellHeight);
    }
    pop();
    this.collide();
  }

  collide() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      cursor(CROSS);
    } else {
      cursor(ARROW);
    }
  }

  init() {
    for (let i = 0; i < this.numNotes; i++) {
      this.notes.push(notesString[i % 7] + (this.startingNote + floor(i / 7)));
      this.grid.push([]);
      for (let j = 0; j < this.w / this.cellWidth; j++) {
        this.grid[i].push(
          new Cell(this.x + j * this.cellWidth, this.y + i * this.cellHeight)
        );
      }
    }
  }
}
