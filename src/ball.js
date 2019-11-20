class Ball {
    constructor(x, y, vel) {
        this.body = Bodies.circle(x, y, BALL_DIAM / 2, ballOptions);
        this.body.collisionFilter.group = -1; //balls don't collide with each other if it is
        World.add(world, this.body);
        //let vel = { x: random(-10, 30), y: random(-30, 10) }
        this.vel = vel;
        Matter.Body.setVelocity(this.body, this.vel);
        Matter.Body.setAngularVelocity(this.body, -this.vel.x / 40);
    }
    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        var rad = BALL_DIAM / 2;

        push();
        fill(255, 69, 0);
        translate(pos.x, pos.y);
        rotate(angle);
        ellipse(0, 0, BALL_DIAM);
        stroke(0);
        line(-rad, 0, rad, 0);
        line(0, -rad, 0, rad);
        //bezier(rad / sqrt(2), rad / sqrt(2), 0, rad / 2, 0, rad / 2, rad / sqrt(2), - rad / sqrt(2));
        //arc(1.2 * rad, 0, 2 * rad, 2 * rad, QUARTER_PI, PI-  QUARTER_PI);
        pop();
    }
}