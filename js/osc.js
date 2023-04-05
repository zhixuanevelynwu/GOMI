var wave;

var button;
var slider;
var playing = false;

var song;
function preload() {
  loadFont("Share_Tech_Mono/ShareTechMono-Regular.ttf");
  song = loadSound("sounds/song.wav");
}

function setup() {
  // create an interface to change frequency, waveform, etc.
  let myCanvas = createCanvas(100, 100);
  myCanvas.id("my-canvas");
  let startFreq = 440;
  slider = createSlider(100, 1200, startFreq);
  button = createButton("play/pause");
  button.mousePressed(toggle);
  // can also set it to triangle / sawtooth wave
  wave = new p5.Oscillator();
  wave.setType("sine");
  // envlope
  env = new p5.Env();
  // .05s attack, .1s decay, .5 sustain, 1 release
  env.setADSR(0.05, 0.1, 0.5, 1);
  // .8 attack volume, 0 release (fade all the way out)
  env.setRange(1.2, 0);
  // set amp and freq only after calling start()
  wave.start();
  wave.amp(env);
  wave.freq(startFreq);
}

function draw() {
  wave.freq(slider.value());
  if (playing) {
    background(255, 0, 255);
  } else {
    background(51);
  }
}

function toggle() {
  env.play();
}
