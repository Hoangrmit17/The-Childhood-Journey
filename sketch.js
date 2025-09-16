let dots = [];
let characterImg;
let charY = 0;
let charTargetY = 0;
let boardHovered = false;
let charAlpha = 0; // Opacity of the character image

// Store board texts in an array for dynamic change
let boardTexts = [
  'Hi!',
  'Welcome to childhood journey!',
  'Today, you will be back to forgotten things!',
  'Enjoy the pixel adventure!',
  'Click Next to continue...'
];
let boardTextIndex = 0;
let boardText = boardTexts[boardTextIndex];

let showPark = false;

// Ferris wheel and icons
let ferrisWheel = {
  x: 0, y: 0, r: 340, angle: 0, seats: 8, attached: Array(8).fill(null), spinning: false
};
let iconImgs = [];
let icons = [];
let draggingIcon = null;
let dragOffset = {x: 0, y: 0};
let bgImg; // Add this line
let char2Img; // Add for loading scene
let guideCharImg; // Add for guide character
let celebrateCharImg; // Add for celebration character
let showGuide = false;
let guideAlpha = 0;
let guideTextList = [
  "Welcome! I'm your guide.\nDo you remember this game?",
  "This is ferris wheel which is the biggest thing in the park.",
  "Now, drag and drop social icons onto the wheel seats.",
  "When all seats are filled, the wheel will spin!"
];
let guideTextIndex = 0;
let guideTextBoxAlpha = 0;
let guideBtnHovered = false;
let celebrateGuideTextList = [
  "Congratulations!\nYou brought the wheel to life!",
  "Look at the wheel, do you remember it?",
  "or you just remember social media icons, hehe.",
  "Now, let's go on another adventure!"
];
let celebrateGuideTextIndex = 0;
let celebrateGuideBtnHovered = false;

let showTetrisLoading = false;
let tetrisLoadingAlpha = 0;
let tetrisLoadingProgress = 0;
let showTetris = false;
let tetrisBgImg; // for the tetris device background
let tetrisArrowImgs = []; // for arrow overlays
let smartphoneImg; // Load your provided smartphone image
let showTetrisGuide = false;
let tetrisGuideAlpha = 0;
let tetrisGuideTextBoxAlpha = 0;
let tetrisGuideBtnHovered = false;
let tetrisGuideTextList = [
  "Welcome to Tetris!",
  "This is a classic puzzle game.",
  "In the childhood, Who owns the device for playing is so rich🤑.",
  "Now, Let's score some points!",
];
let tetrisGuideTextIndex = 0;

let showTetrisGameOverGuide = false;
let tetrisGameOverGuideAlpha = 0;
let tetrisGameOverGuideTextBoxAlpha = 0;
let tetrisGameOverGuideBtnHovered = false;
let tetrisGameOverGuideTextList = [
  "Congratulations!\nYou finished the Tetris game!",
  "Did you enjoy the nostalgia?",
  "Let's continue your adventure!"
];
let tetrisGameOverGuideTextIndex = 0;

let tetrisGameOverTime = null;

function preload() {
  characterImg = loadImage('character.png');
  for (let i = 0; i < 8; i++) {
    iconImgs[i] = loadImage(`icon${i}.png`);
  }
  bgImg = loadImage('Park.png'); // Load background image
  char2Img = loadImage('char2.png'); // Load char2 for loading scene
  guideCharImg = loadImage('guide char.png'); // Use guide char.png as guide character
  celebrateCharImg = loadImage('celebrate char.png'); // Load celebration character
  smartphoneImg = loadImage('smartphone.png'); // Load your provided smartphone image
  
  // Optionally, load arrow overlays if you want custom arrow images
  // tetrisArrowImgs[0] = loadImage('arrow_up.png');
  // tetrisArrowImgs[1] = loadImage('arrow_down.png');
  // tetrisArrowImgs[2] = loadImage('arrow_left.png');
  // tetrisArrowImgs[3] = loadImage('arrow_right.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize random dots
  for (let i = 0; i < 150; i++) {
    dots.push({
      x: random(width),
      y: random(height),
      size: floor(random(2, 8)),
      col: color(random(255), random(255), random(255), random(120, 255)),
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }
  // Setup icons for amusement park scene
  for (let i = 0; i < 8; i++) {
    icons[i] = {
      img: iconImgs[i],
      x: 80 + i * 110, // more spacing for larger icons
      y: height - 120, // move up a bit for larger icons
      w: 96,           // scale up icon size
      h: 96,
      dragging: false,
      attached: false
    };
  }

  // Initialize animated clouds
  clouds = [];
  for (let i = 0; i < 4; i++) {
    clouds.push({
      x: random(width),
      y: random(40, 160),
      w: random(100, 180),
      h: random(28, 44),
      speed: random(0.2, 0.5)
    });
  }

  // Initialize animated birds
  birds = [];
  for (let i = 0; i < 5; i++) {
    birds.push({
      x: random(width),
      y: random(100, 250),
      speed: random(1.2, 2.2),
      wing: random(TWO_PI),
      size: random(24, 38)
    });
  }
}

let nextBtn = {
  w: 120,
  h: 40,
  x: 0,
  y: 0,
  hovered: false
};

let loading = false;
let loadingAlpha = 0;
let loadingProgress = 0;
let loadingDone = false;

function draw() {
  if (loading) {
    drawLoadingTransition();
    return;
  }

  if (showTetrisLoading) {
    drawTetrisLoading();
    return;
  }

  if (showTetris) {
    drawTetrisScene();
    return;
  }

  if (showGuide) {
    drawGuideScene();
    return;
  }

  if (showPark) {
    drawAmusementPark();
    return;
  }

  background(249, 239, 213, 98);

  // Animate and draw dots
  for (let dot of dots) {
    // Move dot
    dot.x += dot.vx;
    dot.y += dot.vy;

    // Bounce off edges
    if (dot.x < 0 || dot.x > width) dot.vx *= -1;
    if (dot.y < 0 || dot.y > height) dot.vy *= -1;

    // Draw as pixel-style square
    noStroke();
    fill(dot.col);
    rect(floor(dot.x), floor(dot.y), dot.size, dot.size);
  }

  // --- Pixel burst effect ---
  for (let i = pixelBursts.length - 1; i >= 0; i--) {
    let p = pixelBursts[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    fill(p.col.levels[0], p.col.levels[1], p.col.levels[2], map(p.life, 0, p.maxLife, 0, 255));
    noStroke();
    rect(p.x, p.y, p.size, p.size);
    if (p.life <= 0) pixelBursts.splice(i, 1);
  }

  // Responsive board sizing
  textSize(36);
  textFont('monospace');
  let paddingX = 48;
  let paddingY = 36;
  let minW = 320;
  let minH = 100;
  let txtW = textWidth(boardText);
  let boardW = max(minW, txtW + paddingX);
  let boardH = max(minH, 36 + paddingY); // 36 is textSize
  let boardX = (width - boardW) / 2;
  let boardY = (height - boardH) / 2;

  // --- Board hover detection ---
  if (
    mouseX > boardX &&
    mouseX < boardX + boardW &&
    mouseY > boardY &&
    mouseY < boardY + boardH
  ) {
    boardHovered = true;
  } else {
    boardHovered = false;
  }

  // --- Character slide animation ---
  let charImgW = 150;
  let charImgH = 150;
  let charX = width / 2 - charImgW / 2;
  let charHiddenY = boardY + boardH - 150; // hidden behind board
  let charShownY = boardY + boardH - charImgH - 80; // visible above board
  charTargetY = boardHovered ? charShownY : charHiddenY;
  // Smooth slide
  charY = lerp(charY || charHiddenY, charTargetY, 0.15);

  // Animate opacity
  let targetAlpha = boardHovered ? 255 : 0;
  charAlpha = lerp(charAlpha, targetAlpha, 0.15);

  // Draw character behind the board with animated opacity
  if (characterImg) {
    push();
    tint(255, charAlpha);
    image(characterImg, charX, charY, charImgW, charImgH);
    pop();
  }

  // --- Draw board and decorations ---
  // Draw shadow
  noStroke();
  fill(0, 60);
  rect(boardX + 8, boardY + 8, boardW, boardH, 10);

  // Draw pixel-style board
  fill(30, 30, 30, 230);
  rect(boardX, boardY, boardW, boardH, 8);

  // Draw pixel-style border
  stroke(255, 255, 255, 180);
  strokeWeight(6);
  noFill();
  rect(boardX, boardY, boardW, boardH, 8);
  noStroke();

  // Draw pixel bar at top
  let barH = 18;
  fill(80, 200, 255, 220);
  rect(boardX, boardY, boardW, barH, 6, 6, 0, 0);

  // Draw colored corner squares (pixel style)
  let sq = 16;
  fill(255, 80, 80);
  rect(boardX - 4, boardY - 4, sq, sq, 4);
  fill(80, 255, 120);
  rect(boardX + boardW - sq + 4, boardY - 4, sq, sq, 4);
  fill(255, 220, 80);
  rect(boardX - 4, boardY + boardH - sq + 4, sq, sq, 4);
  fill(180, 80, 255);
  rect(boardX + boardW - sq + 4, boardY + boardH - sq + 4, sq, sq, 4);

  // Draw pixel-style text
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  textSize(36);
  textFont('monospace');
  text(boardText, width / 2, boardY + boardH / 2);

  // Draw "Next" button
  nextBtn.x = width / 2 - nextBtn.w / 2;
  nextBtn.y = boardY + boardH + 24;

  // Check hover
  if (
    mouseX > nextBtn.x &&
    mouseX < nextBtn.x + nextBtn.w &&
    mouseY > nextBtn.y &&
    mouseY < nextBtn.y + nextBtn.h
  ) {
    nextBtn.hovered = true;
    cursor(HAND);
  } else {
    nextBtn.hovered = false;
    cursor(ARROW);
  }

  // Button background
  fill(nextBtn.hovered ? color(80, 200, 255) : color(50, 50, 50));
  stroke(255);
  strokeWeight(4);
  rect(nextBtn.x, nextBtn.y, nextBtn.w, nextBtn.h, 8);

  // Button text
  noStroke();
  fill(255);
  textSize(24);
  textFont('monospace');
  textAlign(CENTER, CENTER);
  text('Next', nextBtn.x + nextBtn.w / 2, nextBtn.y + nextBtn.h / 2);
}

function drawLoadingTransition() {
  // Fade in loading overlay
  loadingAlpha = min(loadingAlpha + 8, 255);
  loadingProgress += 0.012; // speed of loading bar

  // Draw semi-transparent overlay
  fill(30, 30, 30, loadingAlpha);
  noStroke();
  rect(0, 0, width, height);

  // Draw char2.png centered with loading text
  if (char2Img) {
    let imgW = 200;
    let imgH = 200;
    imageMode(CENTER);
    image(char2Img, width / 2, height / 2.2 - 80, imgW, imgH);
    imageMode(CORNER);
  }

  // Draw pixel-style loading text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont('monospace');
  text('Loading...', width / 2, height / 2 + 10);

  // Draw pixel-style loading bar
  let barW = 340;
  let barH = 28;
  let barX = width / 2 - barW / 2;
  let barY = height / 2 + 60;
  stroke(255);
  strokeWeight(5);
  noFill();
  rect(barX, barY, barW, barH, 8);
  noStroke();
  fill(80, 200, 255);
  let progressW = constrain(barW * loadingProgress, 0, barW);
  rect(barX, barY, progressW, barH, 8);

  // When loading is done, fade out and show park
  if (loadingProgress >= 1) {
    loadingDone = true;
    loadingAlpha = max(loadingAlpha - 12, 0);
    if (loadingAlpha <= 0) {
      loading = false;
      showGuide = true;
      guideAlpha = 0;
      guideTextBoxAlpha = 0;
      loadingProgress = 0;
      loadingAlpha = 0;
      loadingDone = false;
    }
  }
}

// Guide scene after loading, before amusement park
function drawGuideScene() {
  // Draw blurred, darkened background
  if (bgImg) {
    let blurGfx = createGraphics(width, height);
    blurGfx.image(bgImg, 0, 0, width, height);
    blurGfx.filter(BLUR, 4);
    image(blurGfx, 0, 0, width, height);
    blurGfx.remove();
  } else {
    background(40, 40, 40);
  }
  fill(0, 180);
  noStroke();
  rect(0, 0, width, height);

  // Fade in guide character and text box
  guideAlpha = min(guideAlpha + 10, 255);
  guideTextBoxAlpha = min(guideTextBoxAlpha + 10, 230);

  // Draw guide character (centered, scaled up)
  if (guideCharImg) {
    push();
    tint(255, guideAlpha);
    imageMode(CENTER);
    let imgW = 320, imgH = 320;
    image(guideCharImg, width / 2, height / 2 - 180, imgW, imgH);
    pop();
  }

  // Draw text box (centered, covers text)
  let lines = guideTextList[guideTextIndex].split('\n');
  textSize(32);
  textFont('monospace');
  let lineH = 44;
  let textW = 0;
  for (let line of lines) {
    textW = max(textW, textWidth(line));
  }
  let boxW = textW + 80;
  let boxH = lines.length * lineH + 48;
  let boxX = width / 2 - boxW / 2;
  let boxY = height / 2 + 10;

  push();
  fill(30, 30, 30, guideTextBoxAlpha);
  stroke(255, guideTextBoxAlpha);
  strokeWeight(5);
  rect(boxX, boxY, boxW, boxH, 16);
  noStroke();
  fill(255, guideAlpha);
  textAlign(CENTER, TOP);
  textSize(32);
  textFont('monospace');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, boxY + 24 + i * lineH);
  }
  pop();

  // Draw "Continue" button centered below the text box
  let btnW = 180, btnH = 54;
  let btnX = width / 2 - btnW / 2;
  let btnY = boxY + boxH + 28;

  // Hover detection for continue button
  if (
    mouseX > btnX && mouseX < btnX + btnW &&
    mouseY > btnY && mouseY < btnY + btnH
  ) {
    guideBtnHovered = true;
    cursor(HAND);
  } else {
    guideBtnHovered = false;
    cursor(ARROW);
  }

  push();
  fill(guideBtnHovered ? color(80, 200, 255, guideAlpha) : color(50, 50, 50, guideAlpha));
  stroke(255, guideAlpha);
  strokeWeight(3);
  rect(btnX, btnY, btnW, btnH, 12);
  noStroke();
  fill(255, guideAlpha);
  textAlign(CENTER, CENTER);
  textSize(26);
  textFont('monospace');
  text("Continue", btnX + btnW / 2, btnY + btnH / 2);
  pop();

  // Store button area for click
  drawGuideScene.btn = { x: btnX, y: btnY, w: btnW, h: btnH };
}

let fireworks = [];
let fireworksActive = false;
let fireworksStartTime = 0;
let showCelebrateGuide = false;
let celebrateGuideAlpha = 0;
let celebrateGuideTextBoxAlpha = 0;
let celebrateGuideText = "Congratulations!\nYou brought the wheel to life!";

function drawAmusementPark() {
  // Draw background image
  if (bgImg) {
    image(bgImg, 0, 0, width, height);
  } else {
    background(120, 180, 255); // fallback
  }

  // --- Animated clouds ---
  for (let c of clouds) {
    c.x += c.speed;
    if (c.x > width + c.w) c.x = -c.w;
    drawCloud(c.x, c.y, c.w, c.h);
  }

  // --- Animated birds ---
  for (let b of birds) {
    b.x += b.speed;
    if (b.x > width + 40) {
      b.x = -40;
      b.y = random(80, 260);
      b.size = random(24, 38);
    }
    b.wing += 0.18;
    drawBird(b.x, b.y, b.size, b.wing);
  }

  // Ferris wheel position
  ferrisWheel.x = width / 2;
  ferrisWheel.y = height - 40 - ferrisWheel.r - 60;

  // --- Draw wheel base/legs (stand) first, so it's behind the wheel ---
  let baseY = ferrisWheel.y + ferrisWheel.r;
  stroke(55, 65, 85);
  strokeWeight(32);
  line(ferrisWheel.x - 110, baseY + 120, ferrisWheel.x - 60, baseY);
  line(ferrisWheel.x + 110, baseY + 120, ferrisWheel.x + 60, baseY);
  strokeWeight(20);
  line(ferrisWheel.x - 60, baseY, ferrisWheel.x + 60, baseY);

  // --- Ferris wheel styled like the reference image ---
  push();
  translate(ferrisWheel.x, ferrisWheel.y);
  if (ferrisWheel.spinning) {
    ferrisWheel.angle += 0.01;
  }
  rotate(ferrisWheel.angle);

  // Draw main spokes (thicker, dark gray)
  stroke(55, 65, 85);
  strokeWeight(18);
  for (let i = 0; i < ferrisWheel.seats; i++) {
    let a = TWO_PI * i / ferrisWheel.seats;
    let sx = (ferrisWheel.r - 18) * cos(a);
    let sy = (ferrisWheel.r - 18) * sin(a);
    line(0, 0, sx, sy);
  }

  // Draw secondary spokes (between main spokes)
  stroke(80, 90, 110);
  strokeWeight(8);
  for (let i = 0; i < ferrisWheel.seats; i++) {
    let a = TWO_PI * (i + 0.5) / ferrisWheel.seats;
    let sx = (ferrisWheel.r - 30) * cos(a);
    let sy = (ferrisWheel.r - 30) * sin(a);
    line(0, 0, sx, sy);
  }

  // Draw outer rim (dark gray, pixel style)
  stroke(55, 65, 85);
  strokeWeight(14);
  noFill();
  ellipse(0, 0, ferrisWheel.r * 2, ferrisWheel.r * 2);

  // Draw inner rim (lighter gray)
  stroke(120, 130, 150);
  strokeWeight(7);
  ellipse(0, 0, (ferrisWheel.r - 60) * 2, (ferrisWheel.r - 60) * 2);

  // Draw horizontal bars (connect cabins)
  stroke(55, 65, 85);
  strokeWeight(10);
  for (let i = 0; i < ferrisWheel.seats / 2; i++) {
    let a1 = TWO_PI * i / ferrisWheel.seats;
    let a2 = a1 + PI;
    let sx1 = (ferrisWheel.r - 18) * cos(a1);
    let sy1 = (ferrisWheel.r - 18) * sin(a1);
    let sx2 = (ferrisWheel.r - 18) * cos(a2);
    let sy2 = (ferrisWheel.r - 18) * sin(a2);
    line(sx1, sy1, sx2, sy2);
  }

  // Draw center hub (dark with light border)
  stroke(180, 190, 210);
  strokeWeight(8);
  fill(90, 100, 120);
  ellipse(0, 0, 70, 70);
  noStroke();
  fill(120, 130, 150);
  ellipse(0, 0, 32, 32);

  // Draw cabins (pixel style, colored, like ref)
  let cabinColors = [
    [255, 120, 60],   // orange
    [255, 200, 60],   // yellow
    [120, 200, 80],   // green
    [60, 160, 255],   // blue
    [60, 120, 255],   // blue
    [120, 200, 80],   // green
    [255, 200, 60],   // yellow
    [255, 120, 60],   // orange
  ];
  let cabinYOffsets = [0, 0, 0, 0, 0, 0, 0, 0]; // can tweak for pixel effect

  for (let i = 0; i < ferrisWheel.seats; i++) {
    let a = TWO_PI * i / ferrisWheel.seats;
    let seatR = ferrisWheel.r - 18;
    let sx = seatR * cos(a);
    let sy = seatR * sin(a) + cabinYOffsets[i];

    // Cabin body
    push();
    translate(sx, sy);
    rotate(-ferrisWheel.angle); // keep cabins upright
    fill(...cabinColors[i % cabinColors.length]);
    stroke(55, 65, 85);
    strokeWeight(4);
    rectMode(CENTER);
    rect(0, 0, 54, 48, 8);

    // Cabin roof
    fill(55, 65, 85);
    rect(0, -20, 54, 12, 6, 6, 2, 2);

    // Cabin bottom
    fill(80, 90, 110);
    rect(0, 18, 54, 10, 4, 4, 8, 8);

    // Cabin window
    fill(255, 255, 255, 180);
    rect(0, 0, 34, 20, 4);

    pop();
  }

  pop();

  // Draw box behind all icons at the bottom
  let iconBoxPaddingX = 30;
  let iconBoxPaddingY = 24;
  let iconAreaW = icons.length * 110 - 14 + iconBoxPaddingX * 2;
  let iconAreaH = 96 + iconBoxPaddingY * 2;
  let iconAreaX = 80 - iconBoxPaddingX;
  let iconAreaY = height - 120 - iconBoxPaddingY;

  fill(30, 30, 30, 210);
  stroke(255, 180);
  strokeWeight(6);
  rect(iconAreaX, iconAreaY, iconAreaW, iconAreaH, 18);
  noStroke();

  // Draw icons at the bottom (no drop shadow)
  for (let i = 0; i < icons.length; i++) {
    let icon = icons[i];
    if (!icon.attached && icon !== draggingIcon) {
      image(icon.img, icon.x, icon.y, icon.w, icon.h);
    }
  }
  // Draw dragging icon on top (no drop shadow)
  if (draggingIcon) {
    image(draggingIcon.img, mouseX + dragOffset.x, mouseY + dragOffset.y, draggingIcon.w, draggingIcon.h);
  }

  // Draw attached icons on the wheel seats (centered)
  push();
  translate(ferrisWheel.x, ferrisWheel.y);
  rotate(ferrisWheel.angle);
  for (let i = 0; i < ferrisWheel.seats; i++) {
    let a = TWO_PI * i / ferrisWheel.seats;
    let seatR = ferrisWheel.r - 60;
    let sx = seatR * cos(a);
    let sy = seatR * sin(a);
    if (ferrisWheel.attached[i]) {
      imageMode(CENTER);
      image(ferrisWheel.attached[i].img, sx, sy, 96, 96);
    }
  }
  pop();

  // Draw pixel-style instruction with responsive box
  let instruction = 'Drag icons to the wheel to activate it!';
  textSize(28);
  textFont('monospace');
  let instrW = textWidth(instruction) + 64;
  let instrH = 54;
  let instrX = width / 2 - instrW / 2;
  let instrY = 40;

  fill(30, 30, 30, 220);
  rect(instrX, instrY, instrW, instrH, 8);
  stroke(255);
  strokeWeight(4);
  noFill();
  rect(instrX, instrY, instrW, instrH, 8);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  textFont('monospace');
  text(instruction, width / 2, instrY + instrH / 2);

  // Activate spinning if all seats are filled
  if (ferrisWheel.attached.every(seat => seat)) {
    ferrisWheel.spinning = true;
  }

  // --- Fireworks effect when wheel is active ---
  if (ferrisWheel.spinning) {
    if (!fireworksActive) {
      fireworksActive = true;
      fireworksStartTime = millis();
      fireworks = [];
    }
    drawFireworks();

    // After 5 seconds, show celebration guide
    if (!showCelebrateGuide && millis() - fireworksStartTime > 5000) {
      showCelebrateGuide = true;
      celebrateGuideAlpha = 0;
      celebrateGuideTextBoxAlpha = 0;
    }
  }

  // Draw celebration guide char and box if needed
  if (showCelebrateGuide) {
    drawCelebrateGuide();
  }
}

// --- Fireworks effect ---
function drawFireworks() {
  // Launch new fireworks randomly
  if (random() < 0.08 && fireworks.length < 10) {
    fireworks.push(createFirework());
  }
  // Update and draw fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let fw = fireworks[i];
    fw.update();
    fw.show();
    if (fw.done()) {
      fireworks.splice(i, 1);
    }
  }
}

// Firework object
function createFirework() {
  let x = random(120, width - 120);
  let y = random(120, height / 2);
  let colorSet = [
    [255, 80, 80], [255, 220, 80], [80, 255, 120], [80, 200, 255], [180, 80, 255]
  ];
  let c = color(...random(colorSet), 255);
  let particles = [];
  let count = int(random(18, 28));
  for (let i = 0; i < count; i++) {
    let angle = TWO_PI * i / count;
    let speed = random(3, 6);
    particles.push({
      x: x, y: y,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      alpha: 255,
      color: c
    });
  }
  return {
    particles,
    update() {
      for (let p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.04; // gravity
        p.alpha -= 4;
      }
    },
    show() {
      for (let p of this.particles) {
        noStroke();
        fill(red(p.color), green(p.color), blue(p.color), p.alpha);
        rect(p.x, p.y, 6, 6, 2);
      }
    },
    done() {
      return this.particles.every(p => p.alpha <= 0);
    }
  };
}

// --- Celebration Guide ---
function drawCelebrateGuide() {
  // Fade in
  celebrateGuideAlpha = min(celebrateGuideAlpha + 10, 255);
  celebrateGuideTextBoxAlpha = min(celebrateGuideTextBoxAlpha + 10, 230);

  // Draw blurred, darkened overlay
  fill(0, 180);
  noStroke();
  rect(0, 0, width, height);

  // Draw celebration character (centered, scaled up)
  if (celebrateCharImg) {
    push();
    tint(255, celebrateGuideAlpha);
    imageMode(CENTER);
    let imgW = 320, imgH = 320;
    image(celebrateCharImg, width / 2, height / 2 - 180, imgW, imgH);
    pop();
  }

  // Draw text box (centered, covers text)
  let lines = celebrateGuideTextList[celebrateGuideTextIndex].split('\n');
  textSize(32);
  textFont('monospace');
  let lineH = 44;
  let textW = 0;
  for (let line of lines) {
    textW = max(textW, textWidth(line));
  }
  let boxW = textW + 80;
  let boxH = lines.length * lineH + 48;
  let boxX = width / 2 - boxW / 2;
  let boxY = height / 2 + 10;

  push();
  fill(30, 30, 30, celebrateGuideTextBoxAlpha);
  stroke(255, celebrateGuideTextBoxAlpha);
  strokeWeight(5);
  rect(boxX, boxY, boxW, boxH, 16);
  noStroke();
  fill(255, celebrateGuideAlpha);
  textAlign(CENTER, TOP);
  textSize(32);
  textFont('monospace');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, boxY + 24 + i * lineH);
  }
  pop();

  // Draw "Next" button centered below the text box
  let btnW = 180, btnH = 54;
  let btnX = width / 2 - btnW / 2;
  let btnY = boxY + boxH + 28;

  // Hover detection for next button
  if (
    mouseX > btnX && mouseX < btnX + btnW &&
    mouseY > btnY && mouseY < btnY + btnH
  ) {
    celebrateGuideBtnHovered = true;
    cursor(HAND);
  } else {
    celebrateGuideBtnHovered = false;
    cursor(ARROW);
  }

  push();
  fill(celebrateGuideBtnHovered ? color(80, 200, 255, celebrateGuideAlpha) : color(50, 50, 50, celebrateGuideAlpha));
  stroke(255, celebrateGuideAlpha);
  strokeWeight(3);
  rect(btnX, btnY, btnW, btnH, 12);
  noStroke();
  fill(255, celebrateGuideAlpha);
  textAlign(CENTER, CENTER);
  textSize(26);
  textFont('monospace');
  text("Next", btnX + btnW / 2, btnY + btnH / 2);
  pop();

  // Store button area for click
  drawCelebrateGuide.btn = { x: btnX, y: btnY, w: btnW, h: btnH };
}

// --- Tetris loading transition ---
function drawTetrisLoading() {
  tetrisLoadingAlpha = min(tetrisLoadingAlpha + 8, 255);
  tetrisLoadingProgress += 0.012;

  // Draw semi-transparent overlay
  fill(30, 30, 30, tetrisLoadingAlpha);
  noStroke();
  rect(0, 0, width, height);

  // Draw char2.png centered with loading text
  if (char2Img) {
    let imgW = 200;
    let imgH = 200;
    imageMode(CENTER);
    image(char2Img, width / 2, height / 2.2 - 80, imgW, imgH);
    imageMode(CORNER);
  }

  // Draw pixel-style loading text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont('monospace');
  text('Loading...', width / 2, height / 2 + 10);

  // Draw pixel-style loading bar
  let barW = 340;
  let barH = 28;
  let barX = width / 2 - barW / 2;
  let barY = height / 2 + 60;
  stroke(255);
  strokeWeight(5);
  noFill();
  rect(barX, barY, barW, barH, 8);
  noStroke();
  fill(80, 200, 255);
  let progressW = constrain(barW * tetrisLoadingProgress, 0, barW);
  rect(barX, barY, progressW, barH, 8);

  if (tetrisLoadingProgress >= 1) {
    tetrisLoadingAlpha = max(tetrisLoadingAlpha - 12, 0);
    if (tetrisLoadingAlpha <= 0) {
      showTetrisLoading = false;
      showTetris = true;
      tetrisLoadingProgress = 0;
      tetrisLoadingAlpha = 0;
      // Show tetris guide on first entry
      showTetrisGuide = true;
      tetrisGuideAlpha = 0;
      tetrisGuideTextBoxAlpha = 0;
      tetrisGuideTextIndex = 0;
    }
  }
}

// --- Tetris scene ---
let tetrisGame;
function drawTetrisScene() {
  // Show congratulation scene as a separate scene, not overlay
  if (showTetrisGameOverGuide) {
    drawTetrisGameOverGuide();
    return;
  }

  if (showTetrisGuide) {
    drawTetrisGuideScene();
    return;
  }
  background(240, 240, 230);
  drawTetrisFrame();
  // Tetris grid area inside the frame
  let gridW = 10, gridH = 20;
  let cell = min(width, height) * 0.032;
  let frameMargin = min(width, height) * 0.13;
  let gridX = frameMargin + (width - 2 * frameMargin - gridW * cell) / 2;
  let gridY = frameMargin + 80;
  if (!tetrisGame) {
    tetrisGame = new TetrisGame(gridX, gridY, cell);
  }
  tetrisGame.offsetX = gridX;
  tetrisGame.offsetY = gridY;
  tetrisGame.cell = cell;
  tetrisGame.display();

  // Draw score board above the grid
  let scoreW = 180;
  let scoreH = 54;
  let scoreX = gridX + gridW * cell / 2 - scoreW / 2;
  let scoreY = gridY - scoreH - 18;
  push();
  fill(30, 30, 30, 230);
  stroke(255);
  strokeWeight(4);
  rect(scoreX, scoreY, scoreW, scoreH, 12);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(26);
  textFont('monospace');
  text('Score: ' + (tetrisGame.score || 0), scoreX + scoreW / 2, scoreY + scoreH / 2);
  pop();

  // Draw controls guide on the left (expanded for all text)
  let guideW = 320;
  let guideH = 240;
  let guideX = gridX - guideW - 64;
  let guideY = gridY + 10;
  if (guideX > 0) {
    push();
    fill(30, 30, 30, 230);
    stroke(255);
    strokeWeight(4);
    rect(guideX, guideY, guideW, guideH, 16);
    noStroke();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(22);
    textFont('monospace');
    text('Controls:', guideX + 24, guideY + 20);
    textSize(18);
    text('← → : Move block left/right', guideX + 24, guideY + 54);
    text('↓   : Move block down', guideX + 24, guideY + 80);
    text('↑   : Rotate block', guideX + 24, guideY + 106);
    text('Space: Change block shape', guideX + 24, guideY + 132);
    text('Clear lines to score!', guideX + 24, guideY + 164);
    text('Try to get the highest score!', guideX + 24, guideY + 190);
    pop();
  }

  // Overlay congratulation after game over
  if (showTetrisGameOverGuide) {
    drawTetrisGameOverGuide();
  }
}

function drawTetrisGuideScene() {
  // Black blurred background (fixed: use get() to capture canvas)
  let snap = get();
  let blurGfx = createGraphics(width, height);
  blurGfx.image(snap, 0, 0, width, height);
  blurGfx.filter(BLUR, 6);
  image(blurGfx, 0, 0, width, height);
  blurGfx.remove();
  fill(0, 200);
  noStroke();
  rect(0, 0, width, height);

  // Fade in guide character and text box
  tetrisGuideAlpha = min(tetrisGuideAlpha + 10, 255);
  tetrisGuideTextBoxAlpha = min(tetrisGuideTextBoxAlpha + 10, 230);

  // Draw guide character (reuse guideCharImg or tetrisBgImg if available)
  if (guideCharImg) {
    push();
    tint(255, tetrisGuideAlpha);
    imageMode(CENTER);
    let imgW = 260, imgH = 260;
    image(guideCharImg, width / 2, height / 2 - 180, imgW, imgH);
    pop();
  }

  // Draw text box (centered, covers text, expanded)
  let lines = tetrisGuideTextList[tetrisGuideTextIndex].split('\n');
  textSize(30);
  textFont('monospace');
  let lineH = 44; // increased line height for more space
  let textW = 0;
  for (let line of lines) {
    textW = max(textW, textWidth(line));
  }
  let boxW = textW + 120; // expanded width
  let boxH = lines.length * lineH + 64; // expanded height
  let boxX = width / 2 - boxW / 2;
  let boxY = height / 2 + 10;

  push();
  fill(30, 30, 30, tetrisGuideTextBoxAlpha);
  stroke(255, tetrisGuideTextBoxAlpha);
  strokeWeight(5);
  rect(boxX, boxY, boxW, boxH, 16);
  noStroke();
  fill(255, tetrisGuideAlpha);
  textAlign(CENTER, TOP);
  textSize(30);
  textFont('monospace');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, boxY + 32 + i * lineH);
  }
  pop();

  // Draw "Continue" button centered below the text box
  let btnW = 180, btnH = 54;
  let btnX = width / 2 - btnW / 2;
  let btnY = boxY + boxH + 28;

  // Hover detection for continue button
  if (
    mouseX > btnX && mouseX < btnX + btnW &&
    mouseY > btnY && mouseY < btnY + btnH
  ) {
    tetrisGuideBtnHovered = true;
    cursor(HAND);
  } else {
    tetrisGuideBtnHovered = false;
    cursor(ARROW);
  }

  push();
  fill(tetrisGuideBtnHovered ? color(80, 200, 255, tetrisGuideAlpha) : color(50, 50, 50, tetrisGuideAlpha));
  stroke(255, tetrisGuideAlpha);
  strokeWeight(3);
  rect(btnX, btnY, btnW, btnH, 12);
  noStroke();
  fill(255, tetrisGuideAlpha);
  textAlign(CENTER, CENTER);
  textSize(26);
  textFont('monospace');
  text("Continue", btnX + btnW / 2, btnY + btnH / 2);
  pop();

  // Store button area for click
  drawTetrisGuideScene.btn = { x: btnX, y: btnY, w: btnW, h: btnH };
}

function drawTetrisFrame() {
  // Draw background grid
  fill(250, 250, 235);
  noStroke();
  rect(0, 0, width, height);
  // Draw grid lines for pixel effect
  stroke(230, 230, 210, 60);
  strokeWeight(1);
  for (let x = 0; x < width; x += 16) line(x, 0, x, height);
  for (let y = 0; y < height; y += 16) line(0, y, width, y);

  // Draw TETRIS logo and blocks at top
  let logoY = min(width, height) * 0.06;
  let logoX = width / 2;
  textAlign(CENTER, TOP);
  textSize(min(width, height) * 0.08);
  textFont('monospace');
  // Adjusted TETRIS text for better alignment
  fill(255, 140, 40); text('T', logoX - 105, logoY);
  fill(180, 80, 255); text('E', logoX - 63, logoY);
  fill(120, 200, 80); text('T', logoX - 21, logoY);
  fill(255, 220, 80); text('R', logoX + 21, logoY);
  fill(60, 120, 255); text('I', logoX + 63, logoY);
  fill(255, 80, 80); text('S', logoX + 105, logoY);

  // Draw pixel Tetris blocks left/right of logo (move far from text)
  let blockY = logoY + 48;
  let animOffset = sin(millis() * 0.002) * 10; // animated vertical offset
  drawTetrisBlock(logoX - 260, blockY + animOffset, 0);
  drawTetrisBlock(logoX - 230, blockY - animOffset, 1);
  drawTetrisBlock(logoX - 200, blockY + animOffset, 2);
  drawTetrisBlock(logoX + 200, blockY - animOffset, 3);
  drawTetrisBlock(logoX + 230, blockY + animOffset, 4);
  drawTetrisBlock(logoX + 260, blockY - animOffset, 5);

  // Add animated falling pixel blocks for extra effect
  if (!window.tetrisFallingBlocks) window.tetrisFallingBlocks = [];
  if (random() < 0.04 && window.tetrisFallingBlocks.length < 12) {
    window.tetrisFallingBlocks.push({
      x: random(width * 0.18, width * 0.82),
      y: -24,
      type: floor(random(6)),
      speed: random(2, 4)
    });
  }
  for (let i = window.tetrisFallingBlocks.length - 1; i >= 0; i--) {
    let b = window.tetrisFallingBlocks[i];
    drawTetrisBlock(b.x, b.y, b.type);
    b.y += b.speed;
    if (b.y > height) window.tetrisFallingBlocks.splice(i, 1);
  }

  // Draw frame for play area
  let frameMargin = min(width, height) * 0.13;
  let gridW = 10, gridH = 20;
  let cell = min(width, height) * 0.032;
  let gridPxW = gridW * cell;
  let gridPxH = gridH * cell;
  let frameX = frameMargin + (width - 2 * frameMargin - gridPxW) / 2 - 16;
  let frameY = frameMargin + 64;
  stroke(120, 120, 120, 180);
  strokeWeight(18);
  noFill();
  rect(frameX, frameY, gridPxW + 32, gridPxH + 32, 18);
  stroke(180, 180, 180, 180);
  strokeWeight(8);
  rect(frameX + 8, frameY + 8, gridPxW + 16, gridPxH + 16, 12);
  noStroke();
  fill(255);
  rect(frameX + 16, frameY + 16, gridPxW, gridPxH, 4);
}

function drawTetrisBlock(x, y, type) {
  // Draw a small tetris block for logo
  let s = 18;
  switch (type) {
    case 0: // L
      fill(255, 140, 40); rect(x, y, s, s); rect(x + s, y, s, s); rect(x + 2 * s, y, s, s); rect(x + 2 * s, y + s, s, s); break;
    case 1: // T
      fill(180, 80, 255); rect(x, y, s, s); rect(x + s, y, s, s); rect(x + 2 * s, y, s, s); rect(x + s, y + s, s, s); break;
    case 2: // S
      fill(120, 200, 80); rect(x + s, y, s, s); rect(x + 2 * s, y, s, s); rect(x, y + s, s, s); rect(x + s, y + s, s, s); break;
    case 3: // Z
      fill(255, 80, 80); rect(x, y, s, s); rect(x + s, y, s, s); rect(x + s, y + s, s, s); rect(x + 2 * s, y + s, s, s); break;
    case 4: // J
      fill(60, 120, 255); rect(x, y, s, s); rect(x, y + s, s, s); rect(x + s, y + s, s, s); rect(x + 2 * s, y + s, s, s); break;
    case 5: // O
      fill(255, 220, 80); rect(x, y, s, s); rect(x + s, y, s, s); rect(x, y + s, s, s); rect(x + s, y + s, s, s); break;
  }
}

// --- Keyboard controls for Tetris ---
function keyPressed() {
  if (showTetris && tetrisGame && !tetrisGame.gameOver) {
    if (keyCode === LEFT_ARROW) tetrisGame.move(-1, 0);
    if (keyCode === RIGHT_ARROW) tetrisGame.move(1, 0);
    if (keyCode === DOWN_ARROW) tetrisGame.move(0, 1);
    if (keyCode === UP_ARROW) tetrisGame.rotate();
    if (key === ' ' || keyCode === 32) tetrisGame.changeShape();
  }
}

// --- Mouse pressed logic ---
function mousePressed() {
  if (showGuide) {
    // Continue button in guide scene
    let btn = drawGuideScene.btn;
    if (
      btn &&
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      if (guideTextIndex < guideTextList.length - 1) {
        guideTextIndex++;
      } else {
        showGuide = false;
        showPark = true;
      }
      return;
    }
    return;
  }

  // Celebration guide next button logic
  if (showCelebrateGuide) {
    let btn = drawCelebrateGuide.btn;
    if (
      btn &&
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      if (celebrateGuideTextIndex < celebrateGuideTextList.length - 1) {
        celebrateGuideTextIndex++;
      } else {
        showCelebrateGuide = false;
        // Start tetris loading
        showTetrisLoading = true;
        tetrisLoadingAlpha = 0;
        tetrisLoadingProgress = 0;
        showTetris = false;
        // Reset tetris game state
        tetrisGame = null;
      }
      return;
    }
    return;
  }

  if (showTetrisGuide) {
    let btn = drawTetrisGuideScene.btn;
    if (
      btn &&
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      if (tetrisGuideTextIndex < tetrisGuideTextList.length - 1) {
        tetrisGuideTextIndex++;
      } else {
        showTetrisGuide = false;
      }
      return;
    }
    return;
  }

  if (showTetrisLoading) {
    return;
  }

  if (showTetris) {
    // Optionally handle mouse for tetris
    return;
  }

  if (showPark || loading) {
    // Check if mouse is over an unattached icon
    for (let i = 0; i < icons.length; i++) {
      let icon = icons[i];
      if (!icon.attached &&
        mouseX > icon.x && mouseX < icon.x + icon.w &&
        mouseY > icon.y && mouseY < icon.y + icon.h
      ) {
        draggingIcon = icon;
        dragOffset.x = icon.x - mouseX;
        dragOffset.y = icon.y - mouseY;
        icon.dragging = true;
        break;
      }
    }
    return;
  }
  if (
    mouseX > nextBtn.x &&
    mouseX < nextBtn.x + nextBtn.w &&
    mouseY > nextBtn.y &&
    mouseY < nextBtn.y + nextBtn.h
  ) {
    // Cycle through board texts
    boardTextIndex = (boardTextIndex + 1) % boardTexts.length;
    boardText = boardTexts[boardTextIndex];
    // If last text, start loading transition
    if (boardTextIndex === 0) {
      loading = true;
      loadingAlpha = 0;
      loadingProgress = 0;
      loadingDone = false;
    }
  }

  if (showTetrisGameOverGuide) {
    // Use the button area stored in drawTetrisGameOverGuide
    let btn = drawTetrisGameOverGuide.btn;
    if (
      btn &&
      mouseX >= btn.x && mouseX <= btn.x + btn.w &&
      mouseY >= btn.y && mouseY <= btn.y + btn.h
    ) {
      // Show next text box if available, otherwise close the guide
      if (tetrisGameOverGuideTextIndex < tetrisGameOverGuideTextList.length - 1) {
        tetrisGameOverGuideTextIndex++;
      } else {
        showTetrisGameOverGuide = false;
        tetrisGameOverTime = null;
        pixelBursts = [];
        lastMouseX = null;
        lastMouseY = null;
        // Optionally, you can reset or continue the adventure here
      }
      return;
    }
    return;
  }
}

function mouseDragged() {
  if (showPark && draggingIcon) {
    draggingIcon.x = mouseX + dragOffset.x;
    draggingIcon.y = mouseY + dragOffset.y;
  }
}

function mouseReleased() {
  if (showPark && draggingIcon) {
    // Check if dropped on a seat
    let found = false;
    for (let i = 0; i < ferrisWheel.seats; i++) {
      if (!ferrisWheel.attached[i]) {
        // Calculate seat position (center of seat)
        let a = TWO_PI * i / ferrisWheel.seats + ferrisWheel.angle;
        let seatR = ferrisWheel.r - 60; // match the seat radius in draw
        let sx = ferrisWheel.x + seatR * cos(a);
        let sy = ferrisWheel.y + seatR * sin(a);
        // If icon center is close to seat center
        let iconCenterX = mouseX + dragOffset.x + draggingIcon.w / 2;
        let iconCenterY = mouseY + dragOffset.y + draggingIcon.h / 2;
        if (dist(iconCenterX, iconCenterY, sx, sy) < 48) {
          ferrisWheel.attached[i] = draggingIcon;
          draggingIcon.attached = true;
          // Snap icon to seat center
          draggingIcon.x = sx - draggingIcon.w / 2;
          draggingIcon.y = sy - draggingIcon.h / 2;
          found = true;
          break;
        }
      }
    }
    // If not attached, return icon to bottom
    if (!found) {
      draggingIcon.x = 80 + icons.indexOf(draggingIcon) * 110;
      draggingIcon.y = height - 120;
    }
    draggingIcon.dragging = false;
    draggingIcon = null;
  }
}

// Helper to draw a pixel-style cloud
function drawCloud(x, y, w, h) {
  noStroke();
  fill(255, 255, 255, 220);
  rect(x, y, w, h, 8);
  rect(x + w * 0.3, y - h * 0.3, w * 0.5, h * 0.7, 12);
  rect(x + w * 0.6, y + h * 0.2, w * 0.3, h * 0.5, 8);
}

// Helper to draw a pixel-style bird (simple V shape with animated wings)
function drawBird(x, y, size, wingPhase) {
  push();
  stroke(55, 65, 85);
  strokeWeight(3);
  noFill();
  let wingSpan = size;
  let wingY = sin(wingPhase) * (size * 0.25);
  beginShape();
  vertex(x - wingSpan / 2, y + wingY);
  vertex(x, y - wingY * 1.5);
  vertex(x + wingSpan / 2, y + wingY);
  endShape();
  pop();
}

// --- Tetris Game Logic (draws real Tetris blocks) ---
class TetrisGame {
  constructor(offsetX, offsetY, cell) {
    this.gridW = 10;
    this.gridH = 20;
    this.cell = cell || 24;
    this.offsetX = offsetX || width / 2 - this.gridW * this.cell / 2;
    this.offsetY = offsetY || height / 2 - this.gridH * this.cell / 2 - 30;
    this.grid = [];
    for (let y = 0; y < this.gridH; y++) {
      this.grid[y] = Array(this.gridW).fill(0);
    }
    this.bag = [];
    this.current = this.spawnBlock();
    this.dropTimer = millis();
    this.dropInterval = 600;
    this.gameOver = false;
    this.score = 0;
  }
  spawnBlock() {
    // Tetris 7-bag system
    if (this.bag.length === 0) {
      this.bag = shuffle([1, 2, 3, 4, 5, 6, 7]);
    }
    let type = this.bag.pop();
    let block = {
      x: 3, y: 0,
      type: type,
      shape: this.getShape(type, 0),
      rot: 0
    };
    return block;
  }
  getShape(type, rot) {
    // 0: I, 1: O, 2: T, 3: S, 4: Z, 5: J, 6: L
    // Each shape is a 4x4 matrix
    const shapes = [
      // I
      [
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]
      ],
      // O
      [
        [[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]
      ],
      // T
      [
        [[0,1,0],[1,1,1],[0,0,0]],
        [[0,1,0],[0,1,1],[0,1,0]],
        [[0,0,0],[1,1,1],[0,1,0]],
        [[0,1,0],[1,1,0],[0,1,0]]
      ],
      // S
      [
        [[0,1,1],[1,1,0],[0,0,0]],
        [[0,1,0],[0,1,1],[0,0,1]]
      ],
      // Z
      [
        [[1,1,0],[0,1,1],[0,0,0]],
        [[0,0,1],[0,1,1],[0,1,0]]
      ],
      // J
      [
        [[1,0,0],[1,1,1],[0,0,0]],
        [[0,1,1],[0,1,0],[0,1,0]],
        [[0,0,0],[1,1,1],[0,0,1]],
        [[0,1,0],[0,1,0],[1,1,0]]
      ],
      // L
      [
        [[0,0,1],[1,1,1],[0,0,0]],
        [[0,1,0],[0,1,0],[0,1,1]],
        [[0,0,0],[1,1,1],[1,0,0]],
        [[1,1,0],[0,1,0],[0,1,0]]
      ]
    ];
    // I
    if (type === 1) return shapes[0][rot % 2];
    // O
    if (type === 2) return shapes[1][0];
    // T
    if (type === 3) return shapes[2][rot % 4];
    // S
    if (type === 4) return shapes[3][rot % 2];
    // Z
    if (type === 5) return shapes[4][rot % 2];
    // J
    if (type === 6) return shapes[5][rot % 4];
    // L
    if (type === 7) return shapes[6][rot % 4];
  }
  getColor(type) {
    // Tetris colors
    switch (type) {
      case 1: return color(80, 200, 255); // I - cyan
      case 2: return color(255, 220, 80); // O - yellow
      case 3: return color(180, 80, 255); // T - purple
      case 4: return color(120, 200, 80); // S - green
      case 5: return color(255, 80, 80);  // Z - red
      case 6: return color(60, 120, 255); // J - blue
      case 7: return color(255, 140, 40); // L - orange
      default: return color(200);
    }
  }
  display() {
    // Draw grid background
    push();
    fill(230, 240, 255, 60);
    stroke(55, 65, 85, 80);
    strokeWeight(2);
    rect(this.offsetX - 4, this.offsetY - 4, this.gridW * this.cell + 8, this.gridH * this.cell + 8, 10);
    pop();

    // Draw placed blocks
    for (let y = 0; y < this.gridH; y++) {
      for (let x = 0; x < this.gridW; x++) {
        if (this.grid[y][x]) {
          fill(this.getColor(this.grid[y][x]));
          stroke(55, 65, 85);
          strokeWeight(2);
          rect(this.offsetX + x * this.cell, this.offsetY + y * this.cell, this.cell, this.cell, 6);
        }
      }
    }
    // Draw current block
    if (this.current) {
      fill(this.getColor(this.current.type));
      stroke(55, 65, 85);
      strokeWeight(2);
      let shape = this.current.shape;
      for (let dy = 0; dy < shape.length; dy++) {
        for (let dx = 0; dx < shape[dy].length; dx++) {
          if (shape[dy][dx]) {
            rect(
              this.offsetX + (this.current.x + dx) * this.cell,
              this.offsetY + (this.current.y + dy) * this.cell,
              this.cell, this.cell, 6
            );
          }
        }
      }
    }
    // Draw game over
    if (this.gameOver) {
      // Slower flicker, blend, fit exactly over grid, but scale up
      if (smartphoneImg && frameCount % 36 < 18) {
        let scale = 1.25; // scale up smartphone image
        let imgW = this.gridW * this.cell * scale;
        let imgH = this.gridH * this.cell * scale;
        let imgX = this.offsetX + this.gridW * this.cell / 2;
        let imgY = this.offsetY + this.gridH * this.cell / 2;
        push();
        imageMode(CENTER);
        blendMode(MULTIPLY);
        tint(255, 180);
        image(smartphoneImg, imgX, imgY, imgW, imgH);
        blendMode(BLEND);
        pop();
      }
      // Clear, bold, large GAME OVER text with shadow
      push();
      textAlign(CENTER, CENTER);
      textFont('monospace');
      textSize(54);
      fill(0, 180);
      text('GAME OVER', width / 2 + 3, this.offsetY + this.gridH * this.cell / 2 + 3);
      fill(255, 80, 80, 255);
      stroke(255);
      strokeWeight(5);
      text('GAME OVER', width / 2, this.offsetY + this.gridH * this.cell / 2);
      pop();

      if (tetrisGameOverTime === null) {
        tetrisGameOverTime = millis();
      }
      if (!showTetrisGameOverGuide && tetrisGameOverTime && millis() - tetrisGameOverTime > 5000) {
        showTetrisGameOverGuide = true;
        tetrisGameOverGuideAlpha = 0;
        tetrisGameOverGuideTextBoxAlpha = 0;
        tetrisGameOverGuideTextIndex = 0;
      }
    }
    // Drop block
    if (!this.gameOver && millis() - this.dropTimer > this.dropInterval) {
      this.move(0, 1);
      this.dropTimer = millis();
    }
  }
  move(dx, dy) {
    if (!this.current) return;
    let nx = this.current.x + dx;
    let ny = this.current.y + dy;
    if (this.valid(nx, ny, this.current.shape)) {
      this.current.x = nx;
      this.current.y = ny;
    } else if (dy === 1) {
      // Place block
      let shape = this.current.shape;
      for (let dy2 = 0; dy2 < shape.length; dy2++) {
        for (let dx2 = 0; dx2 < shape[dy2].length; dx2++) {
          if (shape[dy2][dx2]) {
            let gx = this.current.x + dx2;
            let gy = this.current.y + dy2;
            if (gy >= 0 && gy < this.gridH && gx >= 0 && gx < this.gridW) {
              this.grid[gy][gx] = this.current.type;
            }
          }
        }
      }
      // Clear lines and update score
      let linesCleared = 0;
      for (let y = this.gridH - 1; y >= 0; y--) {
        if (this.grid[y].every(v => v)) {
          this.grid.splice(y, 1);
          this.grid.unshift(Array(this.gridW).fill(0));
          y++;
          linesCleared++;
        }
      }
      if (linesCleared > 0) {
        this.score += [0, 100, 300, 500, 800][linesCleared] || (linesCleared * 200);
      }
      // Check for game over
      if (this.current.y === 0) {
        this.gameOver = true;
      }
      this.current = this.spawnBlock();
    }
  }
  valid(nx, ny, shape) {
    for (let dy = 0; dy < shape.length; dy++) {
      for (let dx = 0; dx < shape[dy].length; dx++) {
        if (shape[dy][dx]) {
          let gx = nx + dx;
          let gy = ny + dy;
          if (gx < 0 || gx >= this.gridW || gy >= this.gridH) return false;
          if (gy >= 0 && this.grid[gy][gx]) return false;
        }
      }
    }
    return true;
  }
  rotate() {
    if (!this.current) return;
    let rot = this.current.rot + 1;
    let newShape = this.getShape(this.current.type, rot);
    if (this.valid(this.current.x, this.current.y, newShape)) {
      this.current.shape = newShape;
      this.current.rot = rot;
    }
  }
  changeShape() {
    // Change to a random new shape (different from current)
    let newType;
    do {
      newType = floor(random(1, 8));
    } while (newType === this.current.type);
    this.current.type = newType;
    this.current.rot = 0;
    this.current.shape = this.getShape(newType, 0);
  }
}

// --- Tetris Game Over Guide ---
function drawTetrisGameOverGuide() {
  // Draw a clean background instead of overlaying on the game
  fill(240, 240, 230);
  noStroke();
  rect(0, 0, width, height);

  // Fade in
  tetrisGameOverGuideAlpha = min(tetrisGameOverGuideAlpha + 10, 255);
  tetrisGameOverGuideTextBoxAlpha = min(tetrisGameOverGuideTextBoxAlpha + 10, 230);

  // Draw congratulation character (reuse celebrateCharImg)
  if (celebrateCharImg) {
    push();
    tint(255, tetrisGameOverGuideAlpha);
    imageMode(CENTER);
    let imgW = 320, imgH = 320;
    image(celebrateCharImg, width / 2, height / 2 - 180, imgW, imgH);
    pop();
  }

  // Draw text box (centered, covers text)
  let lines = tetrisGameOverGuideTextList[tetrisGameOverGuideTextIndex].split('\n');
  textSize(32);
  textFont('monospace');
  let lineH = 44;
  let textW = 0;
  for (let line of lines) {
    textW = max(textW, textWidth(line));
  }
  let boxW = textW + 100;
  let boxH = lines.length * lineH + 60;
  let boxX = width / 2 - boxW / 2;
  let boxY = height / 2 + 10;

  push();
  fill(30, 30, 30, tetrisGameOverGuideTextBoxAlpha);
  stroke(255, tetrisGameOverGuideTextBoxAlpha);
  strokeWeight(5);
  rect(boxX, boxY, boxW, boxH, 16);
  noStroke();
  fill(255, tetrisGameOverGuideAlpha);
  textAlign(CENTER, TOP);
  textSize(32);
  textFont('monospace');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, boxY + 28 + i * lineH);
  }
  pop();

  // Draw "Continue" button centered below the text box
  let btnW = 180, btnH = 54;
  let btnX = width / 2 - btnW / 2;
  let btnY = boxY + boxH + 28;

  // Always store the button area for click detection
  drawTetrisGameOverGuide.btn = { x: btnX, y: btnY, w: btnW, h: btnH };

  // Hover detection for continue button
  if (
    mouseX > btnX && mouseX < btnX + btnW &&
    mouseY > btnY && mouseY < btnY + btnH
  ) {
    tetrisGameOverGuideBtnHovered = true;
    cursor(HAND);
  } else {
    tetrisGameOverGuideBtnHovered = false;
    cursor(ARROW);
  }

  push();
  fill(tetrisGameOverGuideBtnHovered ? color(80, 200, 255, tetrisGameOverGuideAlpha) : color(50, 50, 50, tetrisGameOverGuideAlpha));
  stroke(255, tetrisGameOverGuideAlpha);
  strokeWeight(3);
  rect(btnX, btnY, btnW, btnH, 12);
  noStroke();
  fill(255, tetrisGameOverGuideAlpha);
  textAlign(CENTER, CENTER);
  textSize(26);
  textFont('monospace');
  text("Continue", btnX + btnW / 2, btnY + btnH / 2);
  pop();
}

let pixelBursts = [];
let lastMouseX = null, lastMouseY = null;

function mouseMoved() {
  // Only trigger in first scene
  if (!showGuide && !showPark && !showTetris && !showTetrisLoading && !loading) {
    textSize(36);
    textFont('monospace');
    let paddingX = 48;
    let paddingY = 36;
    let minW = 320;
    let minH = 100;
       let txtW = textWidth(boardText);
    let boardW = max(minW, txtW + paddingX);
    let boardH = max(minH, 36 + paddingY);
    let boardX = (width - boardW) / 2;
    let boardY = (height - boardH) / 2;
    if (
      mouseX > boardX && mouseX < boardX + boardW &&
      mouseY > boardY && mouseY < boardY + boardH
    ) {
      // Only spawn if mouse moved significantly
      if (lastMouseX === null || dist(mouseX, mouseY, lastMouseX, lastMouseY) > 6) {
        for (let i = 0; i < 16; i++) {
          let angle = random(TWO_PI);
          let speed = random(2, 6);
          pixelBursts.push({
            x: mouseX,
            y: mouseY,
            vx: cos(angle) * speed,
            vy: sin(angle) * speed,
            size: floor(random(3, 8)),
            col: color(random([255, 80, 200, 120, 255]), random([80, 200, 255, 220, 120]), random([80, 255, 120, 255, 200])),
            life: 18 + floor(random(10)),
            maxLife: 28
          });
        }
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }
  }
}


