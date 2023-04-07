var amp;
var playButton;
var createCanvasButton;
var amphistory = [];
var playing = false;

/** global score information */
var score = null;
var globalEnvelope;
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
  slider = createSlider(0, 100, 50);
  slider.position(40, 390);
  playButton = createButton("play");
  playButton.mousePressed(playScore);
  playButton.position(width - 60, height * 0.56);

  createCanvasButton = createButton("create");
  createCanvasButton.mousePressed(create);
  createCanvasButton.position(width - 60, height * 0.52);

  amp = new p5.Amplitude();

  textFont(myFont);
  textSize(15);
  textAlign(CENTER, CENTER);

  globalEnvelope = new Envelope(width * 0.2, height * 0.53, 100, 50);
}

https: function draw() {
  logicalStopTime = slider.value() / 100;
  background(backgroundColor);
  drawText();
  drawScore();
  drawEnvelope();
  visualizeAmplitude();
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

function drawEnvelope() {
  globalEnvelope.drawSelf();
}

function drawScore() {
  if (score) {
    score.drawSelf();
  }
}

//www.youtube.com/watch?v=h_aTgOl9J5I&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=10&ab_channel=TheCodingTrain
function visualizeAmplitude() {
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
