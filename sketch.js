let bottleImg, binImg, bgImg;
let bottle;
let bin;
let score = 0;
let timeLeft = 60;
let gameRunning = true;
let bottleSpeed = 5;

function preload() {
    bottleImg = loadImage("suliaoping.jpeg");  // 确保上传 bottle.png
    binImg = loadImage("lajitong.jpeg");        // 确保上传 bin.png
    bgImg = loadImage("beijing.jpeg");      // 确保上传 campus.jpg
}

function setup() {
    createCanvas(windowWidth, windowHeight);  // 适配所有设备屏幕
    bottle = new Bottle();
    bin = new Bin();
    setInterval(() => {
        if (timeLeft > 0) timeLeft--;
        else gameRunning = false;
    }, 1000);
}

function draw() {
    background(bgImg);
    fill(255);
    textSize(width * 0.06);
    text(`Score: ${score}`, 20, 50);
    text(`Time Left: ${timeLeft}s`, width - 250, 50);

    if (gameRunning) {
        bottle.move();
        bottle.display();
        bin.display();
    } else {
        displayGameOver();
    }
}

// 适配手机触摸屏幕操作
function touchStarted() {
    if (!gameRunning) return;
    bottle.drop();
}

class Bottle {
    constructor() {
        this.x = random(width * 0.1, width * 0.9);
        this.y = height * 0.1;
        this.falling = false;
        this.speed = bottleSpeed;
        this.direction = random() > 0.5 ? 1 : -1;
    }

    move() {
        if (!this.falling) {
            this.x += this.direction * this.speed;
            if (this.x < width * 0.1 || this.x > width * 0.9) this.direction *= -1;
        } else {
            this.y += height * 0.02;
            if (this.y > height * 0.85 && this.x > bin.x - width * 0.1 && this.x < bin.x + width * 0.1) {
                score++;
                this.reset();
            } else if (this.y > height) {
                this.reset();
            }
        }
    }

    drop() {
        this.falling = true;
    }

    reset() {
        this.x = random(width * 0.1, width * 0.9);
        this.y = height * 0.1;
        this.falling = false;
    }

    display() {
        image(bottleImg, this.x - width * 0.05, this.y - height * 0.08, width * 0.1, height * 0.15);
    }
}

class Bin {
    constructor() {
        this.x = width / 2;
        this.y = height - height * 0.15;
    }

    display() {
        image(binImg, this.x - width * 0.075, this.y, width * 0.15, height * 0.15);
    }
}

function displayGameOver() {
    fill(255);
    textSize(width * 0.08);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2 - 40);
    text(`Your Score: ${score}`, width / 2, height / 2);
}

// 窗口大小改变时重新调整画布
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
