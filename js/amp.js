var song;
var amp;
var button;

var amphistory = [];
function preload() {
  loadFont("Share_Tech_Mono/ShareTechMono-Regular.ttf");
  song = loadSound("sounds/song.wav");
}

function setup() {
  // create an interface to change frequency, waveform, etc.
  let myCanvas = createCanvas(400, 200);
  myCanvas.id("my-canvas");
  angleMode(DEGREES);
  slider = createSlider(0, 100, 100);
  button = createButton("play/pause");
  button.mousePressed(toggleSong);

  song.play();
  amp = new p5.Amplitude();
}

//www.youtube.com/watch?v=h_aTgOl9J5I&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=10&ab_channel=TheCodingTrain
https: function draw() {
  song.setVolume(slider.value() / 100);
  background(0);
  amphistory.push(amp.getLevel());
  stroke(255);
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

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
