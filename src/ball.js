class Ball {
    constructor(x, y, xvel, yvel) {
        this.pos = createVector(x, y);
        this.vel = createVector(xvel, yvel);
    }

    move() {
        this.vel.y += GRAVITY;
        
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    show() {
        fill(255, 69, 0);
        ellipse(this.pos.x, this.pos.y, BALL_DIAM, BALL_DIAM);
    }
}