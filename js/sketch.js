var amp;
var playButton;
var createCanvasButton;
var amphistory = [];
var score = null;
var playing = false;

/** global score information */
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
  slider = createSlider(0, 100, 100);
  playButton = createButton("play");
  playButton.mousePressed(playScore);
  createCanvasButton = createButton("new score");
  createCanvasButton.mousePressed(create);

  amp = new p5.Amplitude();

  textFont(myFont);
  textSize(15);
  textAlign(CENTER, CENTER);
}

https: function draw() {
  logicalStopTime = slider.value() / 100;
  background(backgroundColor);
  drawScore();
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

  translate(width / 2, height / 2);
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
        for (let i = 0; i < cell.length; i++) {
          cell[i].play();
        }
        console.log(index, selectedCells.length);
      }, cell.col * logicalStopTime * 1000);
    });
  }
}

function create() {
  console.log("clicked");
  if (!score) {
    score = new Canvas(20);
  }
}
