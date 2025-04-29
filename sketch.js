let bottleImg, binImg, bgImg;
let bottle;
let bin;
let score = 0;
let timeLeft = 60;
let gameRunning = true;
let bottleSpeed = 5;

function preload() {
    bottleImg = loadImage("suliaoping.png");  // 确保上传 bottle.png
    binImg = loadImage("lajitong.png");        // 确保上传 bin.png
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
        this.reset();
    }

    move() {
        if (!this.falling) {
            this.x += this.direction * this.speed;
            if (this.x < width * 0.05 || this.x > width * 0.95) this.direction *= -1;
        } else {
            this.y += height * 0.02;
            if (this.y > height * 0.85 && this.x > bin.x - this.width / 2 && this.x < bin.x + this.width / 2) {
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
        this.updateSize();
    }

    updateSize() {
        if (windowHeight > windowWidth) {
            this.width = width * 0.06;   // 手机竖屏，瓶子小一点
            this.height = height * 0.1;
        } else {
            this.width = width * 0.08;   // 横屏正常
            this.height = height * 0.12;
        }
    }

    display() {
        image(bottleImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}

class Bin {
    constructor() {
        this.updateSize();
    }

    updateSize() {
        this.x = width / 2;
        this.y = height - height * 0.15;
        this.width = width * 0.15;
        this.height = height * 0.15;
    }

    display() {
        image(binImg, this.x - this.width / 2, this.y, this.width, this.height);
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
    bin.updateSize();
    bottle.updateSize();
}
