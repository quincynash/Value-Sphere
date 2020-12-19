let step = 5;
let arrow = 50;
let slider;
let light = 0;
let depth = 15;
let mouse, angle, testAngle, size, outer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, 12, step, 1)
  mouse = createVector(mouseX, mouseY)
  angle = -QUARTER_PI
  calculateSize()
  document.addEventListener('contextmenu', event => event.preventDefault())
}

function calculateSize() {
  size = min(width, height) / 4
  outer = size + 50
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  calculateSize()
}

function drawArrow(r, a, d) {
  push()
  translate(width / 2, height / 2)
  rotate(a)
  ellipse(r + arrow, 0, d, arrow)
  line(r + arrow, arrow / 2, r, 0)
  line(r + arrow, -arrow / 2, r, 0)

  noStroke()
  fill(255)
  rect(r + 3 / 2 * arrow, 0, arrow, arrow / 3)
  stroke(0)
  noFill()

  arc(r + arrow, 0, d / 3, arrow / 3, HALF_PI, 3 * HALF_PI)
  line(r + arrow, arrow / 6, r + 2 * arrow, arrow / 6)
  line(r + arrow, -arrow / 6, r + 2 * arrow, -arrow / 6)
  ellipse(r + 2 * arrow, 0, d / 3, arrow / 3)
  pop()
}

function mousePressed() {
  if (step == 5 && mouseButton == "right") {
    if (keyIsPressed && keyCode == SHIFT) {
      depth += 5
    } else {
      depth -= 5
    }
  }
}

function drawSphere(step) {
  noFill()
  stroke(0)
  strokeWeight(1)
  rectMode(CENTER)
  ellipseMode(CENTER)

  if (step == 1) {
    rect(width / 2, height / 2, size * 2, size * 2)
  } else if (step != 0 && step != 4) {
    drawSphere(step - 1)
  }

  if (step == 2) {
    push()
    translate(width / 2, height / 2)
    rotate(QUARTER_PI)
    rect(0, 0, size * 2, size * 2)
    pop()
  } else if (step == 3) {
    beginShape()
    for (var a = 0; a < TWO_PI; a += PI / 8) {
      vertex(width / 2 + size * cos(a), height / 2 + size * sin(a))
    }
    endShape(CLOSE)
  } else if (step == 4) {
    circle(width / 2, height / 2, size * 2)
  } else if (step == 5) {
    if (mouseIsPressed) {
      if (mouseButton == "left") {
        mouse.x = mouseX
        mouse.y = mouseY
      }
    }
    testAngle = atan2(mouse.y - height / 2, mouse.x - width / 2)
    if (testAngle > -7 / 8 * PI && testAngle < -PI / 8) {
      angle = testAngle
    }
    drawArrow(outer, angle, depth)
  }
}

function draw() {
  background(255);
  step = slider.value()
  drawSphere(step)
}
