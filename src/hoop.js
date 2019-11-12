class Hoop {
    constructor(height) {
        this.pos = createVector(HOOP_X, height);

        this.boxes = [
            [HOOP_RAD + (BACKBOARD_THICKNESS/2), -(BACKBOARD_HEIGHT / 2), BACKBOARD_THICKNESS, BACKBOARD_HEIGHT],
            [-HOOP_RAD - 3, -3, 6, 6]
        ];

        this.body = Bodies.rectangle();
    }

    show() {
        //fill(255,0,0);
        push();
        translate(this.pos.x, this.pos.y);
        stroke(255, 0, 0);
        noFill();
        strokeWeight(2);
        ellipse(0, 0, HOOP_RAD * 2, HOOP_RAD / 5);
        strokeWeight(0.5);
        fill(255);
        stroke(255, 0, 0);
        this.boxes.forEach(box => {
            rect(box[0], box[1], box[2], box[3]);
        });

        pop();
        //rect(this.boxes[1][0], this.boxes[1][1], this.boxes[1][2], this.boxes[1][3]);
    }
}