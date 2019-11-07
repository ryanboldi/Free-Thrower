class Ball {
    constructor(x, y, xvel, yvel) {
        this.pos = createVector(x, y);
        this.vel = createVector(xvel, yvel);
    }

    move() {
        this.vel.y += GRAVITY;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.checkCollisions();
    }

    show() {
        fill(255, 69, 0);
        ellipse(this.pos.x, this.pos.y, BALL_DIAM, BALL_DIAM);
    }

    checkCollisions() {
        //checks to see if it hit any square on the hoop, and then bounce in that direction
        hoopBoxes.forEach(box => {
            if (collideRectCircle(box[0], box[1], box[2], box[3], this.pos.x, this.pos.y, BALL_DIAM)) {
                if(this.pos.x < box[0]){
                    this.vel.x *= -1;
                }
                if (this.pos.y < box[1]){
                    this.vel.y *= -1;
                }
            };
        });
    }
}