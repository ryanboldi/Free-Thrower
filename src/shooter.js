class Shooter {
    constructor(genome) {
        this.pos = createVector(SHOOTER_START_X, SHOOTER_START_Y);
        this.brain = genome;
        this.brain.score = 0;
        this.ball;
        this.scored = false;

        shooters.push(this);
    }

    shoot() {
        let input = [normalise(h.pos.y, 100, HEIGHT - 100, 1, 0), normalise(h.pos.x, WIDTH / 2, WIDTH - HOOP_RAD - HoopCollidors * 2, 0 , 1)];
        //console.log(input);

        let output = this.brain.activate(input);
        let vel = {
            x: normalise(output[0], 0, 1, 0, SHOOTER_MAX_X),
            y: normalise(output[1], 0, 1, 0, SHOOTER_MAX_Y)
        }
        this.ball = new Ball(this.pos.x, this.pos.y, vel);
    }

    show() {
        this.ball.show();


        var collision = (Matter.SAT.collides(this.ball.body, Matter.Composite.get(h.comp, 99, "body")));
        if (collision.collided) {
            if (this.scored == false) {
                this.brain.score = 2;
                this.scored = true;
                console.log("SCORED");
            }
        }
    }
}