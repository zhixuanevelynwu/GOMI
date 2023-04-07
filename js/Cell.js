var currentCell = null;
class Cell {
  constructor(row, col, x, y, freq = 440, waveType = "sine", mode = "osc") {
    this.row = row;
    this.col = col;
    this.x = x;
    this.y = y;
    this.r = 7;
    this.minR = this.r;
    this.maxR = this.r * 2;
    this.selected = false;
    this.freq = freq;
    // create sound wave
    this.wave = new p5.Oscillator();
    this.wave.setType(waveType);
    this.env = new p5.Env();
    // .05s attack, .1s decay, .5 sustain, 1 release
    this.env.setADSR(0.05, 0.1, 0.5, 1);
    // .8 attack volume, 0 release (fade all the way out)
    this.env.setRange(1.2, 0);
  }

  play() {
    // set amp and freq only after calling start()
    this.wave.start();
    this.wave.amp(this.env);
    this.wave.freq(this.freq);
    this.env.play();
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
      currentCell = this;
      return true;
    }
    this.r = this.minR;
    return false;
  }

  compare(other) {
    if (this.x < other.x) {
      return -1;
    } else if (this.x > other.x) {
      return 1;
    }
    return 0;
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);
  if (currentCell && currentCell.collide()) {
    if (currentCell.selected) {
      console.log(currentCell.row, currentCell.col);
      currentCell.selected = false;
      selectedCells.splice(selectedCells.indexOf(currentCell), 1);
    } else {
      currentCell.play();
      currentCell.selected = true;
      sortedInsert(selectedCells, currentCell);
    }
    currentCell = null;
  }
}

function sortedInsert(arr, value) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (value.compare(arr[mid]) > 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  arr.splice(left, 0, value);
}
