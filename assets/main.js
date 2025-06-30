
let stars = [];
let comets = [];

class Star {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.z = random(width);
        this.pz = this.z;
        this.brightness = random(150, 255);
        this.twinkleSpeed = random(0.01, 0.03);
        this.twinkleOffset = random(TWO_PI);
    }

    update() {
        this.z -= 0.1; // Giảm tốc độ di chuyển của sao
        if (this.z < 1) {
            this.z = width;
            this.x = random(width);
            this.y = random(height);
            this.pz = this.z;
            this.brightness = random(150, 255);
            this.twinkleOffset = random(TWO_PI);
        }
    }

    show() {
        let twinkle = map(
            sin(frameCount * this.twinkleSpeed + this.twinkleOffset),
            -1,
            1,
            0.5,
            1
        );
        fill(216, 226, 255, this.brightness * twinkle);
        noStroke();
        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);
        let r = map(this.z, 0, width, 2, 0);
        ellipse(sx, sy, r, r);
        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);
        this.pz = this.z;
        stroke(216, 226, 255, this.brightness * twinkle * 0.4);
        line(px, py, sx, sy);
    }
}

class Comet {
    constructor() {
        this.x = random(width);
        this.y = -50;
        this.speed = random(2, 4); // Giảm tốc độ sao chổi
        this.angle = random(PI / 4, (3 * PI) / 4);
        this.length = random(30, 50);
    }

    update() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
    }

    show() {
        let gradient = drawingContext.createLinearGradient(
            this.x,
            this.y,
            this.x - this.length * cos(this.angle),
            this.y - this.length * sin(this.angle)
        );
        gradient.addColorStop(0, "rgba(185, 180, 126, 0.9)");
        gradient.addColorStop(1, "rgba(185, 180, 126, 0)");
        drawingContext.strokeStyle = gradient;
        strokeWeight(2);
        line(
            this.x,
            this.y,
            this.x - this.length * cos(this.angle),
            this.y - this.length * sin(this.angle)
        );
    }

    isOffScreen() {
        return this.x > width || this.y > height || this.x < 0;
    }
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas-container");
    for (let i = 0; i < 1000; i++) {
        stars.push(new Star());
    }
}

function draw() {
    clear();
    for (let star of stars) {
        star.update();
        star.show();
    }
    if (random(1) < 0.004) {
        // Giảm tần suất xuất hiện sao chổi
        comets.push(new Comet());
    }
    for (let i = comets.length - 1; i >= 0; i--) {
        comets[i].update();
        comets[i].show();
        if (comets[i].isOffScreen()) {
            comets.splice(i, 1);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
