let dots = [];
let pixelBursts = []; // <-- Add this line
let clouds = []; // <-- Add this line
let birds = [];  // <-- Add this line
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
  "Did you see those messy blocks like your phone's app icons?",
  "It's too much, haha. Now let's continue your adventure!"
];
let tetrisGameOverGuideTextIndex = 0;

let tetrisGameOverTime = null;

// --- Add new flags for final loading and final scene ---
let showFinalLoading = false;
let finalLoadingAlpha = 0;
let finalLoadingProgress = 0;
let showFinalScene = false;

// --- Add new flag for camera scene ---
let showCameraScene = false;

// Add new flag for camera loading scene
let showCameraLoading = false;
let cameraLoadingAlpha = 0;
let cameraLoadingProgress = 0;

// --- Camera intro scene flag and text ---
let showCameraIntro = false;
let cameraIntroAlpha = 0;
let cameraIntroTextList = [
  "Ready for the next memory?",
  "Let's take a selfie to capture this moment!",
  "Now smile and say cheese!"
];
let cameraIntroTextIndex = 0;
let cameraIntroBtnHovered = false;

let cameraImg; // camera.png
let elementImgs = []; // Element1.png to Element5.png
let webcam;
let webcamReady = false;

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
  cameraImg = loadImage('camera.png');
  for (let i = 1; i <= 5; i++) {
    elementImgs.push(loadImage(`Element${i}.png`));
  }
  
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
  // Setup webcam but hide it (draw manually)
  webcam = createCapture(VIDEO, () => {
    webcamReady = true;
  });
  webcam.size(320, 240);
  webcam.hide();
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
  // --- Show camera intro scene before camera scene ---
  if (showCameraIntro) {
    drawCameraIntroScene();
    return;
  }

  // --- Show camera loading scene after Tetris, before camera scene ---
  if (showCameraLoading) {
    drawCameraLoading();
    return;
  }

  // --- Show camera scene after Tetris ---
  if (showCameraScene) {
    drawCameraScene();
    return;
  }

  // --- Only show loading/final scene if not in camera scene ---
  if (!showCameraScene) {
    if (showFinalLoading) {
      drawFinalLoading();
      return;
    }
    if (showFinalScene) {
      drawFinalCameraScene();
      return;
    }
  }

  if (loading) {
    drawLoadingTransition();
    return;
  }

  if (showTetrisLoading) {
    drawTetrisLoading();
    return;
  }

  // --- Show Tetris intro scene before Tetris game ---
  if (showTetrisGuide) {
    drawTetrisGuideScene();
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
      tetrisGuideBtnHovered = false;
      tetrisGuideTextIndex = 0;
    }
  }
}

// --- Final loading scene ---
function drawFinalLoading() {
  finalLoadingAlpha = min(finalLoadingAlpha + 8, 255);
  finalLoadingProgress += 0.012;

  fill(30, 30, 30, finalLoadingAlpha);
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

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont('monospace');
  text('Loading...', width / 2, height / 2 + 10);

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
  let progressW = constrain(barW * finalLoadingProgress, 0, barW);
  rect(barX, barY, progressW, barH, 8);

  if (finalLoadingProgress >= 1) {
    finalLoadingAlpha = max(finalLoadingAlpha - 12, 0);
    if (finalLoadingAlpha <= 0) {
      showFinalLoading = false;
      showFinalScene = true;
      finalLoadingProgress = 0;
      finalLoadingAlpha = 0;
    }
  }
}

// --- Final scene placeholder ---
function drawFinalScene() {
  background(30, 30, 30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  textFont('monospace');
  text('The End\n(or your next adventure!)', width / 2, height / 2);
}

function drawTetrisScene() {
  // --- Flicker smartphone overlay and Game Over text if game over ---
  if (tetrisGame && tetrisGame.gameOver && smartphoneImg) {
    // Flicker alpha using a slow sine wave
    let flickerAlpha = 180 + 60 * sin(millis() * 0.002);
    push();
    imageMode(CENTER);
    tint(255, flickerAlpha);
    let imgW = 320, imgH = 520;
    image(smartphoneImg, width / 2, height / 2, imgW, imgH);
    pop();

    fill(255, 80, 80, flickerAlpha);
    textAlign(CENTER, CENTER);
    textFont('monospace');
    textSize(56);
    text("GAME OVER", width / 2, height / 2 - 120);
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
  // --- Handle Tetris Game Over Guide button click FIRST ---
  if (showTetrisGameOverGuide) {
    let btn = drawTetrisGameOverGuide.btn;
    if (
      btn &&
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      if (tetrisGameOverGuideTextIndex < tetrisGameOverGuideTextList.length -  1) {
        tetrisGameOverGuideTextIndex++;
      } else {
        showTetrisGameOverGuide = false;
        tetrisGameOverTime = null;
        pixelBursts = [];
        lastMouseX = null;
        lastMouseY = null;
        // --- Show camera intro scene after Tetris game over guide ---
        showCameraIntro = true;
        cameraIntroAlpha = 0;
        cameraIntroTextIndex = 0;
        showCameraLoading = false;
        showCameraScene = false;
        loading = false;
        showFinalLoading = false;
        showFinalScene = false;
      }
      return;
    }
    return;
  }

  // --- Camera intro scene continue button logic ---
  if (showCameraIntro) {
    let btn = drawCameraIntroScene.btn;
    if (
      btn &&
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      if (cameraIntroTextIndex < cameraIntroTextList.length - 1) {
        cameraIntroTextIndex++;
      } else {
        showCameraIntro = false;
        showCameraLoading = true;
        cameraLoadingAlpha = 0;
        cameraLoadingProgress = 0;
      }
      return;
    }
    return;
  }

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

  // --- Opening scene "Next" button logic ---
  if (
    !showCameraScene && !showGuide && !showPark && !loading && !showTetrisLoading &&
    !showTetris && !showCelebrateGuide && !showTetrisGuide && !showTetrisGameOverGuide &&
    !showFinalLoading && !showFinalScene
  ) {
    // Only advance if mouse is over the Next button
    if (
      mouseX > nextBtn.x &&
      mouseX < nextBtn.x + nextBtn.w &&
      mouseY > nextBtn.y &&
      mouseY < nextBtn.y + nextBtn.h
    ) {
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

// --- Final camera scene ---
function drawFinalCameraScene() {
  background(30, 30, 30);

  // Draw animated elements around the camera
  let cx = width / 2;
  let cy = height / 2;
  let radius = 220;
  let t = millis() * 0.001;
  for (let i = 0; i < elementImgs.length; i++) {
    let angle = t + i * (TWO_PI / elementImgs.length);
    let ex = cx + cos(angle) * radius;
    let ey = cy + sin(angle) * radius;
    let s = 90 + 18 * sin(t * 1.2 + i);
    if (elementImgs[i]) {
      push();
      imageMode(CENTER);
      translate(ex, ey);
      rotate(0.1 * sin(t + i));
      image(elementImgs[i], 0, 0, s, s);
      pop();
    }
  }

  // Draw camera frame in center
  let camW = 340, camH = 260;
  if (cameraImg) {
    imageMode(CENTER);
    image(cameraImg, cx, cy, camW, camH);
  }

  // Draw webcam feed inside camera frame (with rounded corners)
  if (webcamReady && webcam) {
    push();
    imageMode(CENTER);
    // Clip to rounded rectangle (matches the camera "screen" area)
    let clipW = camW * 0.78, clipH = camH * 0.62;
    translate(cx, cy - 8);
    drawingContext.save();
    drawingContext.beginPath();
    if (drawingContext.roundRect) {
      drawingContext.roundRect(-clipW/2, -clipH/2, clipW, clipH, 32);
    } else {
      drawingContext.rect(-clipW/2, -clipH/2, clipW, clipH);
    }
    drawingContext.clip();
    image(webcam, 0, 0, clipW, clipH);
    drawingContext.restore();
    pop();
  } else {
    // Show loading text if webcam not ready
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("Waiting for camera...", cx, cy);
  }

  // Optional: Add a title
  fill(255);
  textAlign(CENTER, TOP);
  textSize(36);
  textFont('monospace');
  text('Say Cheese!', cx, cy + camH / 2 + 32);
}

// --- Camera scene after Tetris ---
function drawCameraScene() {
  // Cream background
  background(255, 251, 235);

  // --- Decorative pastel circles ---
  for (let i = 0; i < 8; i++) {
    let angle = (TWO_PI / 8) * i + millis() * 0.0002;
    let r = 320 + 24 * sin(millis() * 0.0007 + i);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    fill(255, 220, 120, 90);
    noStroke();
    ellipse(x, y, 60 + 10 * sin(millis() * 0.001 + i), 60 + 10 * cos(millis() * 0.001 + i));
  }
  for (let i = 0; i < 5; i++) {
    let angle = (TWO_PI / 5) * i + millis() * 0.0003;
    let r = 200 + 40 * cos(millis() * 0.001 + i);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    fill(120, 200, 255, 70);
    noStroke();
    ellipse(x, y, 36, 36);
  }
  // --- Decorative stars ---
  for (let i = 0; i < 4; i++) {
    let angle = (TWO_PI / 4) * i + millis() * 0.0005;
    let r = 260 + 30 * sin(millis() * 0.0012 + i);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    push();
    translate(x, y);
    rotate(millis() * 0.0007 + i);
    fill(255, 180, 220, 100);
    noStroke();
    for (let j = 0; j < 5; j++) {
      let a = TWO_PI * j / 5;
      let sx = cos(a) * 14;
      let sy = sin(a) * 14;
      let sx2 = cos(a + PI / 5) * 6;
      let sy2 = sin(a + PI / 5) * 6;
      triangle(0, 0, sx, sy, sx2, sy2);
    }
    pop();
  }

  // Draw animated elements around the camera
  let cx = width / 2;
  let cy = height / 2;
  let radius = 220;
  let t = millis() * 0.001;
  for (let i = 0; i < elementImgs.length; i++) {
    let angle = t + i * (TWO_PI / elementImgs.length);
    let ex = cx + cos(angle) * radius;
    let ey = cy + sin(angle) * radius;
    let s = 90 + 18 * sin(t * 1.2 + i);
    if (elementImgs[i]) {
      push();
      imageMode(CENTER);
      translate(ex, ey);
      rotate(0.1 * sin(t + i));
      image(elementImgs[i], 0, 0, s, s);
      pop();
    }
  }

  // --- Scale up Camera.png ---
  let camW = 480, camH = 368; // was 340, 260
  if (cameraImg) {
    imageMode(CENTER);
    image(cameraImg, cx, cy, camW, camH);
  }

  if (webcamReady && webcam) {
    push();
    imageMode(CENTER);
    let clipW = camW * 0.78, clipH = camH * 0.62;
    translate(cx, cy - 8);
    drawingContext.save();
    drawingContext.beginPath();
    if (drawingContext.roundRect) {
      drawingContext.roundRect(-clipW/2, -clipH/2, clipW, clipH, 32);
    } else {
      drawingContext.rect(-clipW/2, -clipH/2, clipW, clipH);
    }
    drawingContext.clip();
    image(webcam, 0, 0, clipW, clipH);
    drawingContext.restore();
    pop();
  } else {
    fill(80, 80, 80);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("Waiting for camera...", cx, cy);
  }

  fill(80, 80, 80);
  textAlign(CENTER, TOP);
  textSize(36);
  textFont('monospace');
  text('Say Cheese!', cx, cy + camH / 2 + 32);
}

// --- Camera intro scene ---
function drawCameraIntroScene() {
  cameraIntroAlpha = min(cameraIntroAlpha + 10, 255);

  // Cream background
  background(255, 251, 235);

  // Decorative elements (reuse from camera scene)
  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI / 6) * i + millis() * 0.0002;
    let r = 320 + 24 * sin(millis() * 0.0007 + i);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    fill(255, 220, 120, 70);
    noStroke();
    ellipse(x, y, 60 + 10 * sin(millis() * 0.001 + i), 60 + 10 * cos(millis() * 0.001 + i));
  }

  // --- Draw guide character (centered, above text box) ---
  if (guideCharImg) {
    push();
    tint(255, cameraIntroAlpha);
    imageMode(CENTER);
    let imgW = 320, imgH = 320;
    image(guideCharImg, width / 2, height / 2 - 140, imgW, imgH);
    pop();
  }

  // Draw text box with intro text
  let lines = cameraIntroTextList[cameraIntroTextIndex].split('\n');
  textSize(36);
  textFont('monospace');
  let lineH = 48;
  let textW = 0;
  for (let line of lines) textW = max(textW, textWidth(line));
  let boxW = textW + 80;
  let boxH = lines.length * lineH + 48;
  let boxX = width / 2 - boxW / 2;
  let boxY = height / 2 + 30;

  push();
  fill(30, 30, 30, 220);
  stroke(255, cameraIntroAlpha);
  strokeWeight(5);
  rect(boxX, boxY, boxW, boxH, 16);
  noStroke();
  fill(255, cameraIntroAlpha);
  textAlign(CENTER, TOP);
  textSize(36);
  textFont('monospace');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, boxY + 24 + i * lineH);
  }
  pop();

  // Draw "Continue" button
  let btnW = 180, btnH = 54;
  let btnX = width / 2 - btnW / 2;
  let btnY = boxY + boxH + 28;
  if (
    mouseX > btnX && mouseX < btnX + btnW &&
    mouseY > btnY && mouseY < btnY + btnH
  ) {
    cameraIntroBtnHovered = true;
    cursor(HAND);
  } else {
    cameraIntroBtnHovered = false;
    cursor(ARROW);
  }
  push();
  fill(cameraIntroBtnHovered ? color(80, 200, 255, cameraIntroAlpha) : color(50, 50, 50, cameraIntroAlpha));
  stroke(255, cameraIntroAlpha);
  strokeWeight(3);
  rect(btnX, btnY, btnW, btnH, 12);
  noStroke();
  fill(255, cameraIntroAlpha);
  textAlign(CENTER, CENTER);
  textSize(26);
  textFont('monospace');
  text("Continue", btnX + btnW / 2, btnY + btnH / 2);
  pop();

  // Store button area for click
  drawCameraIntroScene.btn = { x: btnX, y: btnY, w: btnW, h: btnH };
}

// --- Update mousePressed to handle camera intro scene ---
function mousePressed() {
  // --- Handle Tetris Game Over Guide button click FIRST ---
  if (showTetrisGameOverGuide) {
    let btn = drawTetrisGameOverGuide.btn;
    if (
      btn &&
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      if (tetrisGameOverGuideTextIndex < tetrisGameOverGuideTextList.length -  1) {
        tetrisGameOverGuideTextIndex++;
      } else {
        showTetrisGameOverGuide = false;
        tetrisGameOverTime = null;
        pixelBursts = [];
        lastMouseX = null;
        lastMouseY = null;
        // --- Show camera intro scene after Tetris game over guide ---
        showCameraIntro = true;
        cameraIntroAlpha = 0;
        cameraIntroTextIndex = 0;
        showCameraLoading = false;
        showCameraScene = false;
        loading = false;
        showFinalLoading = false;
        showFinalScene = false;
      }
      return;
    }
    return;
  }

  // --- Camera intro scene continue button logic ---
  if (showCameraIntro) {
    let btn = drawCameraIntroScene.btn;
    if (
      btn &&
      mouseX > btn.x && mouseX < btn.x + btn.w &&
      mouseY > btn.y && mouseY < btn.y + btn.h
    ) {
      if (cameraIntroTextIndex < cameraIntroTextList.length - 1) {
        cameraIntroTextIndex++;
      } else {
        showCameraIntro = false;
        showCameraLoading = true;
        cameraLoadingAlpha = 0;
        cameraLoadingProgress = 0;
      }
      return;
    }
    return;
  }

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

  // --- Opening scene "Next" button logic ---
  if (
    !showCameraScene && !showGuide && !showPark && !loading && !showTetrisLoading &&
    !showTetris && !showCelebrateGuide && !showTetrisGuide && !showTetrisGameOverGuide &&
    !showFinalLoading && !showFinalScene
  ) {
    // Only advance if mouse is over the Next button
    if (
      mouseX > nextBtn.x &&
      mouseX < nextBtn.x + nextBtn.w &&
      mouseY > nextBtn.y &&
      mouseY < nextBtn.y + nextBtn.h
    ) {
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

// --- Final camera scene ---
function drawFinalCameraScene() {
  background(30, 30, 30);

  // Draw animated elements around the camera
  let cx = width / 2;
  let cy = height / 2;
  let radius = 220;
  let t = millis() * 0.001;
  for (let i = 0; i < elementImgs.length; i++) {
    let angle = t + i * (TWO_PI / elementImgs.length);
    let ex = cx + cos(angle) * radius;
    let ey = cy + sin(angle) * radius;
    let s = 90 + 18 * sin(t * 1.2 + i);
    if (elementImgs[i]) {
      push();
      imageMode(CENTER);
      translate(ex, ey);
      rotate(0.1 * sin(t + i));
      image(elementImgs[i], 0, 0, s, s);
      pop();
    }
  }

  // Draw camera frame in center
  let camW = 340, camH = 260;
  if (cameraImg) {
    imageMode(CENTER);
    image(cameraImg, cx, cy, camW, camH);
  }

  // Draw webcam feed inside camera frame (with rounded corners)
  if (webcamReady && webcam) {
    push();
    imageMode(CENTER);
    // Clip to rounded rectangle (matches the camera "screen" area)
    let clipW = camW * 0.78, clipH = camH * 0.62;
    translate(cx, cy - 8);
    drawingContext.save();
    drawingContext.beginPath();
    if (drawingContext.roundRect) {
      drawingContext.roundRect(-clipW/2, -clipH/2, clipW, clipH, 32);
    } else {
      drawingContext.rect(-clipW/2, -clipH/2, clipW, clipH);
    }
    drawingContext.clip();
    image(webcam, 0, 0, clipW, clipH);
    drawingContext.restore();
    pop();
  } else {
    // Show loading text if webcam not ready
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("Waiting for camera...", cx, cy);
  }

  // Optional: Add a title
  fill(255);
  textAlign(CENTER, TOP);
  textSize(36);
  textFont('monospace');
  text('Say Cheese!', cx, cy + camH / 2 + 32);
}

// --- Camera scene after Tetris ---
function drawCameraScene() {
  // Cream background
  background(255, 251, 235);

  // --- Decorative pastel circles ---
  for (let i = 0; i < 8; i++) {
    let angle = (TWO_PI / 8) * i + millis() * 0.0002;
    let r = 320 + 24 * sin(millis() * 0.0007 + i);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    fill(255, 220, 120, 90);
    noStroke();
    ellipse(x, y, 60 + 10 * sin(millis() * 0.001 + i), 60 + 10 * cos(millis() * 0.001 + i));
  }
  for (let i = 0; i < 5; i++) {
    let angle = (TWO_PI / 5) * i + millis() * 0.0003;
    let r = 200 + 40 * cos(millis() * 0.001 + i);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    fill(120, 200, 255, 70);
    noStroke();
    ellipse(x, y, 36, 36);
  }
  // --- Decorative stars ---
  for (let i = 0; i < 4; i++) {
    let angle = (TWO_PI / 4) * i + millis() * 0.0005;
    let r = 260 + 30 * sin(millis() * 0.0012 + i);
    let x = width / 2 + cos(angle) * r;
    let y = height / 2 + sin(angle) * r;
    push();
    translate(x, y);
    rotate(millis() * 0.0007 + i);
    fill(255, 180, 220, 100);
    noStroke();
    for (let j = 0; j < 5; j++) {
      let a = TWO_PI * j / 5;
      let sx = cos(a) * 14;
      let sy = sin(a) * 14;
      let sx2 = cos(a + PI / 5) * 6;
      let sy2 = sin(a + PI / 5) * 6;
      triangle(0, 0, sx, sy, sx2, sy2);
    }
    pop();
  }

  // Draw animated elements around the camera
  let cx = width / 2;
  let cy = height / 2;
  let radius = 220;
  let t = millis() * 0.001;
  for (let i = 0; i < elementImgs.length; i++) {
    let angle = t + i * (TWO_PI / elementImgs.length);
    let ex = cx + cos(angle) * radius;
    let ey = cy + sin(angle) * radius;
    let s = 90 + 18 * sin(t * 1.2 + i);
    if (elementImgs[i]) {
      push();
      imageMode(CENTER);
      translate(ex, ey);
      rotate(0.1 * sin(t + i));
      image(elementImgs[i], 0, 0, s, s);
      pop();
    }
  }

  // --- Scale up Camera.png ---
  let camW = 480, camH = 368; // was 340, 260
  if (cameraImg) {
    imageMode(CENTER);
    image(cameraImg, cx, cy, camW, camH);
  }

  if (webcamReady && webcam) {
    push();
    imageMode(CENTER);
    let clipW = camW * 0.78, clipH = camH * 0.62;
    translate(cx, cy - 8);
    drawingContext.save();
    drawingContext.beginPath();
    if (drawingContext.roundRect) {
      drawingContext.roundRect(-clipW/2, -clipH/2, clipW, clipH, 32);
    } else {
      drawingContext.rect(-clipW/2, -clipH/2, clipW, clipH);
    }
    drawingContext.clip();
    image(webcam, 0, 0, clipW, clipH);
    drawingContext.restore();
    pop();
  } else {
    fill(80, 80, 80);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("Waiting for camera...", cx, cy);
  }

  fill(80, 80, 80);
  textAlign(CENTER, TOP);
  textSize(36);
  textFont('monospace');
  text('Say Cheese!', cx, cy + camH / 2 + 32);
}

// --- Camera loading scene ---
function drawCameraLoading() {
  cameraLoadingAlpha = min(cameraLoadingAlpha + 8, 255);
  cameraLoadingProgress += 0.012;

  fill(30, 30, 30, cameraLoadingAlpha);
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

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont('monospace');
  text('Loading...', width / 2, height / 2 + 10);

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
  let progressW = constrain(barW * cameraLoadingProgress, 0, barW);
  rect(barX, barY, progressW, barH, 8);

  if (cameraLoadingProgress >= 1) {
    cameraLoadingAlpha = max(cameraLoadingAlpha - 12, 0);
    if (cameraLoadingAlpha <= 0) {
      showCameraLoading = false;
      showCameraScene = true;
      cameraLoadingProgress = 0;
      cameraLoadingAlpha = 0;
    }
  }
}

// --- Add these utility functions for clouds and birds ---
function drawCloud(x, y, w, h) {
  push();
  noStroke();
  fill(255, 255, 255, 180);
  ellipse(x, y, w, h);
  ellipse(x - w * 0.3, y + h * 0.1, w * 0.6, h * 0.7);
  ellipse(x + w * 0.3, y + h * 0.1, w * 0.5, h * 0.6);
  pop();
}

function drawBird(x, y, size, wing) {
  push();
  stroke(60, 60, 60);
  strokeWeight(2);
  noFill();
  // Draw two wings as arcs
  arc(x, y, size, size * 0.7, PI + wing, TWO_PI + wing);
  arc(x, y, size, size * 0.7, PI + wing + 0.8, TWO_PI + wing + 0.8);
  pop();
}

// --- Minimal TetrisGame class for demo/fix ---
class TetrisGame {
  constructor(x, y, cell) {
    this.offsetX = x;
    this.offsetY = y;
    this.cell = cell;
    this.gridW = 10;
    this.gridH = 20;
    this.grid = [];
    for (let i = 0; i < this.gridH; i++) {
      this.grid[i] = Array(this.gridW).fill(0);
    }
    this.score = 0;
    this.gameOver = false;
    this.shapes = [
      // I
      [[1, 1, 1, 1]],
      // O
      [[1, 1], [1, 1]],
      // T
      [[0, 1, 0], [1, 1, 1]],
      // S
      [[0, 1, 1], [1, 1, 0]],
      // Z
      [[1, 1, 0], [0, 1, 1]],
      // J
      [[1, 0, 0], [1, 1, 1]],
      // L
      [[0, 0, 1], [1, 1, 1]]
    ];
    this.colors = [
      color(80, 200, 255), // I
      color(255, 220, 80), // O
      color(180, 80, 255), // T
      color(80, 255, 120), // S
      color(255, 80, 80),  // Z
      color(60, 120, 255), // J
      color(255, 140, 40)  // L
    ];
    this.spawnBlock();
    this.dropCounter = 0;
    this.dropInterval = 30; // frames
  }
  spawnBlock() {
    this.shapeIndex = floor(random(this.shapes.length));
    this.shape = this.shapes[this.shapeIndex];
    this.block = {
      x: floor(this.gridW / 2) - floor(this.shape[0].length / 2),
      y: 0,
      shape: this.shape,
      color: this.colors[this.shapeIndex]
    };
    if (this.collides(this.block.x, this.block.y, this.block.shape)) {
      this.gameOver = true;
    }
  }
  collides(x, y, shape) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          let gx = x + j;
          let gy = y + i;
          if (gx < 0 || gx >= this.gridW || gy >= this.gridH) return true;
          if (gy >= 0 && this.grid[gy][gx]) return true;
        }
      }
    }
    return false;
  }
  merge() {
    let { x, y, shape, color } = this.block;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          let gx = x + j;
          let gy = y + i;
          if (gy >= 0 && gx >= 0 && gx < this.gridW && gy < this.gridH)
            this.grid[gy][gx] = color;
        }
      }
    }
  }
  clearLines() {
    let lines = 0;
    for (let i = this.gridH - 1; i >= 0; i--) {
      if (this.grid[i].every(cell => cell)) {
        this.grid.splice(i, 1);
        this.grid.unshift(Array(this.gridW).fill(0));
        lines++;
        i++;
      }
    }
    if (lines > 0) this.score += lines * 100;
  }
  display() {
    // Draw grid
    for (let i = 0; i < this.gridH; i++) {
      for (let j = 0; j < this.gridW; j++) {
        stroke(220);
        strokeWeight(1);
        fill(245);
        rect(this.offsetX + j * this.cell, this.offsetY + i * this.cell, this.cell, this.cell);
        if (this.grid[i][j]) {
          fill(this.grid[i][j]);
          rect(this.offsetX + j * this.cell, this.offsetY + i * this.cell, this.cell, this.cell);
        }
      }
    }
    // Draw current block
    if (!this.gameOver && this.block) {
      let { x, y, shape, color } = this.block;
      fill(color);
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j]) {
            rect(this.offsetX + (x + j) * this.cell, this.offsetY + (y + i) * this.cell, this.cell, this.cell);
          }
        }
      }
    }
    // Drop block automatically
    if (!this.gameOver) {
      this.dropCounter++;
      if (this.dropCounter >= this.dropInterval) {
        this.move(0, 1);
        this.dropCounter = 0;
           }
    }
  }
  move(dx, dy) {
    if (this.gameOver) return;
    let { x, y, shape } = this.block;
    let nx = x + dx;
    let ny = y + dy;
    if (!this.collides(nx, ny, shape)) {
      this.block.x = nx;
      this.block.y = ny;
    } else if (dy === 1) {
      // Landed
      this.merge();
      this.clearLines();
      this.spawnBlock();
      // --- Show Tetris Game Over Guide if game is over ---
      if (this.gameOver && typeof showTetrisGameOverGuide !== "undefined") {
        showTetrisGameOverGuide = true;
        tetrisGameOverGuideAlpha = 0;
        tetrisGameOverGuideTextBoxAlpha = 0;
        tetrisGameOverGuideTextIndex = 0;
      }
    }
  }
  rotate() {
    if (this.gameOver) return;
    let { x, y, shape } = this.block;
    let newShape = [];
    for (let j = 0; j < shape[0].length; j++) {
      newShape[j] = [];
      for (let i = shape.length - 1; i >= 0; i--) {
        newShape[j][shape.length - 1 - i] = shape[i][j];
      }
    }
    if (!this.collides(x, y, newShape)) {
      this.block.shape = newShape;
    }
  }
  changeShape() {
    if (this.gameOver) return;
    let idx = (this.shapeIndex + 1) % this.shapes.length;
    let newShape = this.shapes[idx];
    if (!this.collides(this.block.x, this.block.y, newShape)) {
      this.block.shape = newShape;
      this.block.color = this.colors[idx];
      this.shapeIndex = idx;
    }
  }
}

// Add this function if not present (drawTetrisGameOverGuide):
function drawTetrisGameOverGuide() {
  // Fade in
  tetrisGameOverGuideAlpha = min(tetrisGameOverGuideAlpha + 10, 255);
  tetrisGameOverGuideTextBoxAlpha = min(tetrisGameOverGuideTextBoxAlpha + 10, 230);

  // Draw blurred, darkened overlay
  fill(0, 200);
  noStroke();
  rect(0, 0, width, height);

  // --- Draw smartphone.png in the center ---
  if (smartphoneImg) {
    push();
    imageMode(CENTER);
    let imgW = 320, imgH = 520;
    image(smartphoneImg, width / 2, height / 2 - 60, imgW, imgH);
    pop();
  }

  // --- Draw "GAME OVER" text on top of smartphone, more clear ---
  push();
  textAlign(CENTER, CENTER);
  textFont('monospace');
  textSize(64);
  stroke(0, 0, 0, tetrisGameOverGuideAlpha * 0.9);
  strokeWeight(10);
  fill(255, 80, 80, tetrisGameOverGuideAlpha);
  text("GAME OVER", width / 2, height / 2 - 180);
  noStroke();
  fill(255, 255, 255, tetrisGameOverGuideAlpha);
  textSize(64);
  text("GAME OVER", width / 2, height / 2 - 180);
  pop();

  // --- Draw celebrateCharImg above the text box, both moved down a bit ---
  const charY = height / 2 + 80; // moved down
  const boxY = height / 2 + 170; // moved down, below char

  if (celebrateCharImg) {
    push();
    tint(255, tetrisGameOverGuideAlpha);
    imageMode(CENTER);
    let imgW = 220, imgH = 220;
    image(celebrateCharImg, width / 2, charY, imgW, imgH);
    pop();
  }

  // Draw text box (moved down)
  let lines = tetrisGameOverGuideTextList[tetrisGameOverGuideTextIndex].split('\n');
  textSize(30);
  textFont('monospace');
  let lineH = 44;
  let textW = 0;
  for (let line of lines) {
    textW = max(textW, textWidth(line));
  }
  let boxW = textW + 120;
  let boxH = lines.length * lineH + 64;
  let boxX = width / 2 - boxW / 2;
  // let boxY = height / 2 + 60; // old
  // boxY is now set above

  push();
  fill(30, 30, 30, tetrisGameOverGuideTextBoxAlpha);
  stroke(255, tetrisGameOverGuideTextBoxAlpha);
  strokeWeight(5);
  rect(boxX, boxY, boxW, boxH, 16);
  noStroke();
  fill(255, tetrisGameOverGuideAlpha);
  textAlign(CENTER, TOP);
  textSize(30);
  textFont('monospace');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, boxY + 32 + i * lineH);
  }
  pop();

  // Draw "Next" button centered below the text box
  let btnW = 180, btnH = 54;
  let btnX = width / 2 - btnW / 2;
  let btnY = boxY + boxH + 28;

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
  text("Next", btnX + btnW / 2, btnY + btnH / 2);
  pop();

  // Store button area for click
  drawTetrisGameOverGuide.btn = { x: btnX, y: btnY, w: btnW, h: btnH };
}
