class Ball {
    constructor(x, y) {
        this.body = Bodies.circle(x,y,BALL_DIAM/2, ballOptions);
        World.add(world, this.body);

    }
    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        var rad = BALL_DIAM/2;

        push();
        fill(255, 69, 0);
        translate(pos.x, pos.y);
        rotate(angle);
        ellipse(0,0,BALL_DIAM);
        stroke(0);
        line(-rad,0, rad, 0);
        line(0, -rad, 0, rad);
        
        pop();
    }
}