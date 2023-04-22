var amp;
var playButton;
var createCanvasButton;
var clearButton;
var amphistory = [];
var playing = false;

/** global score information */
var score = null;
var globalADSR;
var notesString = ["c", "d", "e", "f", "g", "a", "b"];
var selectedCells = [];
var logicalStopTime = 1;

/** styles */
var backgroundColor = 0;
var contentColor = 255;

/** assets */
var myFont;
var pianoNote;

function preload() {
  myFont = loadFont("Share_Tech_Mono/ShareTechMono-Regular.ttf");
  pianoNote = loadSound("sounds/pianoC4.wav");
}

function setup() {
  // create an interface to change frequency, waveform, etc.
  let myCanvas = createCanvas(windowWidth * 0.99, windowHeight * 0.9);
  myCanvas.id("my-score");
  angleMode(DEGREES);

  // ioi control slider
  slider = createSlider(0, 100, 50);
  slider.position(40, 390);

  // create button
  createCanvasButton = createButton("create");
  createCanvasButton.mousePressed(create);
  createCanvasButton.position(width - 60, height * 0.52);

  // play button
  playButton = createButton("play");
  playButton.mousePressed(playScore);
  playButton.position(width - 60, height * 0.56);

  // clear button
  clearButton = createButton("clear");
  clearButton.mousePressed(clearCanvas);
  clearButton.position(width - 60, height * 0.6);

  amp = new p5.Amplitude();

  // style
  textFont(myFont);
  textSize(15);
  textAlign(CENTER, CENTER);

  globalADSR = new Envelope(width * 0.25, height * 0.6, 350, 170);
}

https: function draw() {
  logicalStopTime = slider.value() / 100;
  background(backgroundColor);
  drawText();
  drawScore();
  drawADSR();
  // visualizeAmplitude();
  visualizeAmplitudeCircle();
}

function drawText() {
  push();
  noStroke();
  textSize(20);
  fill(contentColor);
  text("Graphical Composition Tool", width / 2, 50);
  textSize(12);
  textAlign(LEFT);
  text("logical-stop-time: " + slider.value() / 100, 90, 383);
  pop();
}

function drawADSR() {
  globalADSR.drawSelf();
}

function drawScore() {
  if (score) {
    score.drawSelf();
  }
}

//www.youtube.com/watch?v=h_aTgOl9J5I&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=10&ab_channel=TheCodingTrain
function visualizeAmplitude() {
  push();
  amphistory.push(amp.getLevel());
  stroke(contentColor);
  noFill();

  beginShape();
  for (let i = 0; i < amphistory.length - 20; i++) {
    let y = map(amphistory[i], 0, 1, height, height / 2);
    vertex(i, y);
  }
  endShape();
  if (amphistory.length > width - 20) {
    amphistory.splice(0, 1);
  }
  stroke(255, 150, 150);
  line(amphistory.length - 20, height / 1.7, amphistory.length - 20, height);
  pop();
}

function visualizeAmplitudeCircle() {
  amphistory.push(amp.getLevel());
  stroke(contentColor);
  noFill();

  translate(width * 0.1, height * 0.75);
  beginShape();
  for (let i = 0; i < 360; i++) {
    r = map(amphistory[i], 0, 1, 100, 0);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  if (amphistory.length > 360) {
    amphistory.splice(0, 1);
  }
}

function playScore() {
  console.log(playing);
  if (score && !playing) {
    playing = true;
    // Schedule the notes
    selectedCells.forEach((cell) => {
      setTimeout(() => {
        cell.play();
      }, cell.col * logicalStopTime * 1000);
    });
    setTimeout(() => {
      playing = false;
    }, selectedCells.length * logicalStopTime * 1000);
  }
}

function create() {
  console.log("clicked");
  if (!score) {
    score = new Canvas(100);
  }
}

function clearCanvas() {
  for (let i = 0; i < selectedCells.length; i++) {
    selectedCells[i].selected = false;
  }
  selectedCells.splice(0, score.notes.length);
}
