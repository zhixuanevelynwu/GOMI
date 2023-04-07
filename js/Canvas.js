class Canvas {
  constructor(y, startingNote = 4, numNotes = 14, mode = "osc") {
    this.x = width * 0.04;
    this.y = y;
    this.startingNote = startingNote;
    this.numNotes = numNotes;
    this.w = width * 0.95;
    this.cellWidth = 20;
    this.cellHeight = 20;
    this.h = this.cellHeight * this.numNotes;
    this.cells = [];
    this.notes = [];
    this.init();
  }

  drawSelf() {
    push();
    fill(contentColor);
    noStroke();
    // Draw cells
    for (let i = 0; i < this.cells.length; i++) {
      push();
      stroke(contentColor, 100);
      line(
        this.x,
        this.y + i * this.cellHeight,
        this.x + this.w - this.cellWidth + 5,
        this.y + i * this.cellHeight
      );
      pop();
      for (let j = 0; j < this.cells[i].length; j++) {
        fill(171, 169, 200, 150);
        this.cells[i][j].drawSelf();
      }
      fill(contentColor);
      text(this.notes[i], this.x - 20, this.y + i * this.cellHeight);
    }

    // Connect between selected cells
    stroke(contentColor, 200);
    strokeWeight(2);
    for (let i = 0; i < selectedCells.length - 1; i++) {
      line(
        selectedCells[i].x,
        selectedCells[i].y,
        selectedCells[i + 1].x,
        selectedCells[i + 1].y
      );
    }

    this.collide();
    pop();
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
      let note = notesString[i % 7] + (this.startingNote + floor(i / 7));
      this.notes.push(note);
      this.cells.push([]);
      for (let j = 0; j < this.w / this.cellWidth; j++) {
        this.cells[i].push(
          new Cell(
            i,
            j,
            this.x + j * this.cellWidth,
            this.y + i * this.cellHeight,
            midiToFreq(noteToMidi(note))
          )
        );
      }
    }
  }
}

function noteToMidi(note) {
  const octave = parseInt(note.slice(-1));
  const noteLetter = note.slice(0, -1);
  const noteIndex = notesString.indexOf(noteLetter);
  if (noteIndex === -1) {
    console.error("Invalid note letter:", noteLetter);
    return;
  }
  const midiNote = 12 * (octave + 1) + noteIndex;
  return midiNote;
}
