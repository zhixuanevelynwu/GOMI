class Envelope {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.attackTime = 0.1;
    this.decayTime = 0.2;
    this.sustainTime = 0.5;
    this.releaseTime = 1;

    this.attackLevel = 1;
    this.sustainLevel = 0.5;
    this.releaseLevel = 0;

    // create sliders
    this.sliderX = this.x + this.w + 20;
    this.sliderY = this.y + 20;
    this.sliderTextX = this.sliderX + 50;
    this.sliderTextY = this.sliderY - 7;

    this.attackSlider = createSlider(0, 1, this.attackTime, 0.01);
    this.attackSlider.position(this.sliderX, this.sliderY);

    this.decaySlider = createSlider(0, 1, this.decayTime, 0.01);
    this.decaySlider.position(this.sliderX, this.sliderY + 20);

    this.sustainSlider = createSlider(0, 1, this.sustainTime, 0.01);
    this.sustainSlider.position(this.sliderX, this.sliderY + 40);

    this.releaseSlider = createSlider(0, 1, this.releaseTime, 0.01);
    this.releaseSlider.position(this.sliderX, this.sliderY + 60);

    this.attackLevelSlider = createSlider(0, 1, this.attackLevel, 0.01);
    this.attackLevelSlider.position(this.sliderX, this.sliderY + 100);

    this.sustainLevelSlider = createSlider(0, 1, this.sustainLevel, 0.01);
    this.sustainLevelSlider.position(this.sliderX, this.sliderY + 120);

    this.releaseLevelSlider = createSlider(0, 1, this.releaseLevel, 0.01);
    this.releaseLevelSlider.position(this.sliderX, this.sliderY + 140);
  }

  drawSelf() {
    this.attackTime = this.attackSlider.value();
    this.decayTime = this.decaySlider.value();
    this.sustainTime = this.sustainSlider.value();
    this.releaseTime = this.releaseSlider.value();

    this.attackLevel = this.attackLevelSlider.value();
    this.sustainLevel = this.sustainLevelSlider.value();
    this.releaseLevel = this.releaseLevelSlider.value();

    let t1 = this.w * this.attackTime;
    let l1 = -this.h * this.attackLevel;
    let t2 = max(this.w * this.decayTime, t1);
    let l2 = -this.h * this.sustainLevel;
    let t3 = max(this.w * this.sustainTime, t2);
    let l3 = l2;
    let t4 = max(this.w * this.releaseTime, t3);
    let l4 = -this.h * this.releaseLevel;

    push();
    fill(contentColor, 20);
    noStroke();
    rect(this.x, this.y, this.w, this.h);

    // draw ADSR
    stroke(200, 100, 125, 200);
    translate(this.x, this.y + this.h);
    line(0, 0, t1, l1);
    line(t1, l1, t2, l2);
    line(t2, l2, t3, l3);
    line(t3, l3, t4, l4);
    pop();

    // annotate
    push();
    textSize(12);
    textAlign(LEFT);
    fill(contentColor);
    noStroke();
    text(
      "attackTime: " + this.attackSlider.value(),
      this.sliderTextX,
      this.sliderTextY
    );
    text(
      "decayTime: " + this.decaySlider.value(),
      this.sliderTextX,
      this.sliderTextY + 20
    );
    text(
      "sustainTime: " + this.sustainSlider.value(),
      this.sliderTextX,
      this.sliderTextY + 40
    );
    text(
      "releaseTime: " + this.releaseSlider.value(),
      this.sliderTextX,
      this.sliderTextY + 60
    );
    text(
      "attackLevel: " + this.attackLevelSlider.value(),
      this.sliderTextX,
      this.sliderTextY + 100
    );
    text(
      "sustainLevel: " + this.sustainLevelSlider.value(),
      this.sliderTextX,
      this.sliderTextY + 120
    );
    text(
      "releaseLevel: " + this.releaseLevelSlider.value(),
      this.sliderTextX,
      this.sliderTextY + 140
    );

    pop();
  }
}
