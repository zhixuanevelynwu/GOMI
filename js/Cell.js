var currentCell = null;
class Cell {
  constructor(row, col, x, y, freq = 440) {
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
    this.env = new p5.Env();
    this.wave.setType("sine");
    this.color = "#C6D8AF";
    this.playing = false;
  }

  play() {
    this.env.setADSR(
      globalADSR.attackTime,
      globalADSR.decayTime,
      globalADSR.sustainLevel,
      globalADSR.releaseTime
    );
    this.env.setRange(globalADSR.attackLevel, globalADSR.releaseLevel);

    this.wave.start();
    this.wave.amp(this.env);
    this.wave.freq(this.freq);
    this.env.play();
  }

  drawSelf() {
    if (this.playing) {
      this.r = min(this.r + 1, this.maxR * 1.5);
      // fill("#FBFEF9");
      fill(this.color);
    } else if (this.selected) {
      fill(this.color);
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
    if (!this.playing) {
      this.r = max(this.r - 1, this.minR);
    }
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
      // represent different wave types with different colors on canvas
      switch (myRadio.value()) {
        case "sine":
          currentCell.color = sineColor;
          break;
        case "triangle":
          currentCell.color = triangleColor;
          break;
        case "sawtooth":
          currentCell.color = sawtoothColor;
          break;
        case "square":
          currentCell.color = squareColor;
          break;
      }
      currentCell.wave.setType(myRadio.value());
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
