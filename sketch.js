let bottleImg, binImg, bgImg;
let bottle;
let bin;
let score = 0;
let timeLeft = 60;
let gameRunning = true;
let bottleSpeed = 5;

function preload() {
    // 预加载插画素材
    bottleImg = loadImage("suliaoping.jpeg");  // 替换为你的瓶子插画路径
    binImg = loadImage("lajitong.jpeg");        // 替换为你的垃圾桶插画路径
    bgImg = loadImage("beijing.jpeg");      // 替换为你的校园背景路径
}

function setup() {
    createCanvas(windowWidth, windowHeight);  // 适配手机屏幕
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
    textSize(32);
    text(`Score: ${score}`, 20, 40);
    text(`Time Left: ${timeLeft}s`, width - 200, 40);

    if (gameRunning) {
        bottle.move();
        bottle.display();
        bin.display();
    } else {
        displayGameOver();
    }
}

// 触摸屏幕触发瓶子掉落
function touchStarted() {
    if (!gameRunning) return;
    bottle.drop();
}

class Bottle {
    constructor() {
        this.x = random(50, width - 50);
        this.y = 80;
        this.falling = false;
        this.speed = bottleSpeed;
        this.direction = random() > 0.5 ? 1 : -1;
    }

    move() {
        if (!this.falling) {
            this.x += this.direction * this.speed;
            if (this.x < 50 || this.x > width - 50) this.direction *= -1;
        } else {
            this.y += 7;
            if (this.y > height - 150 && this.x > bin.x - 40 && this.x < bin.x + 40) {
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
        this.x = random(50, width - 50);
        this.y = 80;
        this.falling = false;
    }

    display() {
        image(bottleImg, this.x - 25, this.y - 40, 50, 80);  // 放大瓶子
    }
}

class Bin {
    constructor() {
        this.x = width / 2;
        this.y = height - 120;
    }

    display() {
        image(binImg, this.x - 50, this.y, 100, 80);  // 放大垃圾桶
    }
}

function displayGameOver() {
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2 - 40);
    text(`Your Score: ${score}`, width / 2, height / 2);
}

// 适配窗口大小变化
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
